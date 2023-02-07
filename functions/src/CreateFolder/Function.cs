using System;
using System.Text.Json;
using Amazon.Lambda.Core;
using Amazon.S3;
using Amazon.Lambda.APIGatewayEvents;
using CloudPhoto.Common;
using System.Threading.Tasks;

namespace CloudPhoto.Functions
{
    public class CreateFolderEvent {
        public string FolderName {get;set;}
    }

    public class CreateFolderFunction
    {
        const string HEADER_USERID_KEY = "Cloudphoto-Userid";
        IAmazonS3 s3Client;
        string applicationStorageName;


        /// <summary>
        /// Constructor with Parameters for testing
        /// </summary>
        public CreateFolderFunction(IAmazonS3 s3, string bucketName)
        {
            s3Client = s3 ?? new AmazonS3Client(Amazon.RegionEndpoint.EUCentral1);
            applicationStorageName = Environment.GetEnvironmentVariable("BUCKET_NAME") ?? bucketName ?? string.Empty;
        }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public CreateFolderFunction()
        {
            s3Client = new AmazonS3Client(Amazon.RegionEndpoint.EUCentral1);
            applicationStorageName = Environment.GetEnvironmentVariable("BUCKET_NAME") ?? string.Empty;
        }

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            context.Logger.LogLine(String.Join(Environment.NewLine, request.Headers));
            string userId;
            string folderName;
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
                folderName = JsonSerializer.Deserialize<CreateFolderEvent>(request.Body).FolderName;
            }
            catch (JsonException ex)
            {
                return APIGateWayResponse.GetErrorResponse(ex.ToString());
            }

            try
            {
                context.Logger.LogLine($"Try to create folder with params: Bucket={applicationStorageName} key={userId}/{folderName}");
                var response =  await s3Client.PutObjectAsync(new Amazon.S3.Model.PutObjectRequest{
                    BucketName = applicationStorageName,
                    Key = $"{userId}/{folderName}"
                });
                return APIGateWayResponse.GetOkResonse(response.HttpStatusCode.ToString());
            }
            catch (Exception ex)
            {
                return APIGateWayResponse.GetErrorResponse(ex.ToString());
            }
        }
    }
}
