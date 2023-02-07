using System;
using Amazon.Lambda.Core;
using Amazon.S3;
using Amazon.Lambda.APIGatewayEvents;
using CloudPhoto.Common;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.


namespace CloudPhoto.Functions
{   
     public class GetUserAlbums
    {
        IAmazonS3 s3Client;
        string applicationStorageName;


        /// <summary>
        /// Constructor with Parameters for testing
        /// </summary>
        public GetUserAlbums(IAmazonS3 s3, string bucketName)
        {
            s3Client = s3 ?? new AmazonS3Client();
            applicationStorageName = Environment.GetEnvironmentVariable("BUCKET_NAME") ?? bucketName ?? string.Empty;
        }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public GetUserAlbums()
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
            if (string.IsNullOrEmpty(applicationStorageName))
            {
                return APIGateWayResponse.GetErrorResponse("No Bucket defined");
            }

            return APIGateWayResponse.GetOkResonse("");
        }
    }
}
