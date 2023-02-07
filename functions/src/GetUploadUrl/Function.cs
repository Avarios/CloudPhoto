using System;
using System.Collections.Generic;
using System.Text.Json;
using Amazon.Lambda.Core;
using Amazon.S3;
using Amazon.Lambda.APIGatewayEvents;
using CloudPhoto.Common;


[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]
namespace CloudPhoto.Functions
{
    public class GetUploadUrlEvent
    {
        public string Folder { get; set; }
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

    // Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.

    public class GetUploadUrlFunction
    {
        const string HEADER_USERID_KEY = "Cloudphoto-Userid";
        IAmazonS3 s3Client;
        string applicationStorageName;


        /// <summary>
        /// Constructor with Parameters for testing
        /// </summary>
        public GetUploadUrlFunction(IAmazonS3 s3, string bucketName)
        {
            s3Client = s3 ?? new AmazonS3Client();
            applicationStorageName = Environment.GetEnvironmentVariable("BUCKET_NAME") ?? bucketName ?? string.Empty;
        }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public GetUploadUrlFunction()
        {
            s3Client = new AmazonS3Client();
            applicationStorageName = Environment.GetEnvironmentVariable("BUCKET_NAME") ?? string.Empty;
        }

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public APIGatewayProxyResponse FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            context.Logger.LogLine(String.Join(Environment.NewLine, request.Headers));
            GetUploadUrlEvent model;
            GetUploadUrlResponse result = new GetUploadUrlResponse();
            string userId;
            if (string.IsNullOrEmpty(applicationStorageName))
            {
                return APIGateWayResponse.GetErrorResponse("No Bucket defined");
            }

            if (!request.Headers.TryGetValue(HEADER_USERID_KEY, out userId))
            {
                return APIGateWayResponse.GetUnauthorizedResponse();
            }


            try
            {
                model = JsonSerializer.Deserialize<GetUploadUrlEvent>(request.Body);
            }
            catch (JsonException ex)
            {
                return APIGateWayResponse.GetErrorResponse(ex.ToString());
            }

            if (string.IsNullOrEmpty(model.Folder))
            {
                return APIGateWayResponse.GetErrorResponse(new BackendErrorMessage { Message = "No Folder provided", Code = 100 });
            }

            try
            {
                model.FileNames.ForEach((file) =>
                {
                    var preSignedUrl = s3Client.GetPreSignedURL(new Amazon.S3.Model.GetPreSignedUrlRequest
                    {
                        BucketName = $"{applicationStorageName}/{userId}/{model.Folder}",
                        Key = file,
                        Expires = new DateTime().AddHours(1)
                    });
                    result.UploadUrls.Add(file, preSignedUrl);
                });

            }
            catch (Exception ex)
            {
                return APIGateWayResponse.GetErrorResponse(ex.ToString());
            }

            try
            {
                return APIGateWayResponse.GetOkResonse(JsonSerializer.Serialize<GetUploadUrlResponse>(result));
            }
            catch (JsonException ex)
            {
                return APIGateWayResponse.GetErrorResponse(ex.ToString());
            }

        }
    }
}
