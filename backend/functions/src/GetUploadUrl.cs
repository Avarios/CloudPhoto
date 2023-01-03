using System;
using System.Collections.Generic;
using System.Text.Json;
using Amazon.Lambda.Core;
using Amazon.S3;
using Amazon.Lambda.APIGatewayEvents;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace cloudphotobackend
{
    public class GetUploadUrlEvent
    {
        public List<string> FileNames { get; set; }
    }

    public class GetUploadUrlResponse
    {
        public GetUploadUrlResponse()
        {
            UploadUrls = new Dictionary<string, string>();
        }
        public Dictionary<string, string> UploadUrls { get; set; }
    }

    public class GetUploadUrl
    {

        IAmazonS3 s3Client;
        string applicationStorageName;

        public GetUploadUrl(IAmazonS3? s3,string? bucketName)
        {
            s3Client = s3 ?? new AmazonS3Client();
            applicationStorageName = Environment.GetEnvironmentVariable("BUCKET_NAME") ?? bucketName ?? string.Empty;
        }

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public APIGatewayHttpApiV2ProxyResponse FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
        {
            if (string.IsNullOrEmpty(applicationStorageName))
            {
                return APIGateWayResponse.GetErrorResponse("Bucket not defined");
            }
            GetUploadUrlEvent model;
            GetUploadUrlResponse result = new GetUploadUrlResponse();
            try
            {
                model = JsonSerializer.Deserialize<GetUploadUrlEvent>(request.Body);
            }
            catch (JsonException ex)
            {
                return APIGateWayResponse.GetErrorResponse(ex.Message);
            }

            try
            {
                model.FileNames.ForEach((file) =>
                {
                    var preSignedUrl = s3Client.GetPreSignedURL(new Amazon.S3.Model.GetPreSignedUrlRequest { BucketName = applicationStorageName, Key = file });
                    result.UploadUrls.Add(file,preSignedUrl);
                });

            }
            catch (Exception ex)
            {
                return APIGateWayResponse.GetErrorResponse(ex.Message);
            }

            try
            {
                return APIGateWayResponse.GetOkResonse(JsonSerializer.Serialize<GetUploadUrlResponse>(result));
            }
            catch (JsonException ex)
            {
                return APIGateWayResponse.GetErrorResponse(ex.Message);
            }

        }
    }
}
