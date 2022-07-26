using System;
using System.Collections.Generic;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.S3;
using System.Text.Json;
using System.Net;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace getUploadUrl
{
    public class Function
    {
        /// <summary>
        /// Constructor for the Function
        /// </summary>
        public Function()
        {
            s3Client = new AmazonS3Client();
        }

        /// <summary>
        /// Amazon S3 Client to access buckrt function
        /// </summary>
        /// <returns>S3Client</returns>
        private AmazonS3Client s3Client;

        /// <summary>
        /// Get signed upload urls for x files that has to be uploaded
        /// </summary>
        /// <param name="request">APIGatewayHttpApiV2ProxyRequest</param>
        /// <param name="context">ILambdaContext</param>
        /// <returns>A list of Urls for FileUploading</returns>
        public APIGatewayHttpApiV2ProxyResponse FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
        {
            try
            {
                // Bucketname is injected from previous Lambda , or not i am not sure yet :D 
                var bucketName = request.Headers["bucketname"];
                var files = JsonSerializer.Deserialize<List<string>>(request.Body);
                var preSignedUrls = new List<string>();
                files.ForEach(x => {
                    var fileKey = $"{x}_{new Random().Next(10000,99999)}";
                    preSignedUrls.Add(GetPreSignedUrl(bucketName,fileKey));
                });

                return new APIGatewayHttpApiV2ProxyResponse{
                    Body = JsonSerializer.Serialize(preSignedUrls),
                    StatusCode = (int)HttpStatusCode.OK
                };
            }
            catch (JsonException ex)
            {
                context.Logger.Log(ex.ToString());
                return new APIGatewayHttpApiV2ProxyResponse{
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    Body = "Could not read from the JSON"
                };
            }
            catch (ArgumentNullException ex) {
                context.Logger.Log(ex.ToString());
                return new APIGatewayHttpApiV2ProxyResponse{
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Body = "Please provide files"
                };
            }
            catch (Amazon.S3.AmazonS3Exception s) {
                context.Logger.Log(s.ToString());
                return new APIGatewayHttpApiV2ProxyResponse{
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    Body = "Not able to get pre signed Urls"
                };
            }
        }
        private string GetPreSignedUrl(string bucketName, string fileKey){
            var request = new Amazon.S3.Model.GetPreSignedUrlRequest {
                BucketName= bucketName,
                Expires = DateTime.Now.AddHours(1),
                Key = fileKey
            };     
            return s3Client.GetPreSignedURL(request);
        }
    }
}
