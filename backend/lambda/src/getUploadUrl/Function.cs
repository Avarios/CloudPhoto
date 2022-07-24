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
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns>A list of Urls for FileUploading</returns>
        public APIGatewayHttpApiV2ProxyResponse FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
        {
            try
            {
                var bucketName = getBucketNameForUser(request.RequestContext.Authorizer.Jwt.Claims["username"]);
                var files = JsonSerializer.Deserialize<List<FileModel>>(request.Body);
                var preSignedUrls = files.ConvertAll<string>(x => {
                    return getPreSignedUrl(x.FileName);
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

        private string getBucketNameForUser(string username) {

        }

        private string getPreSignedUrl(string filename){
            var request = new Amazon.S3.Model.GetPreSignedUrlRequest {

            };
        }
    }

    public class FileModel
    {
        public string FileName { get; set; }
    }
}
