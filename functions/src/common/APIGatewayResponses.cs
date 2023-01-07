using Amazon.Lambda.APIGatewayEvents;
using System.Collections.Generic;
using System.Text.Json;

namespace CloudPhoto.Common
{
    public static class APIGateWayResponse
    {

        private static Dictionary<string, string> Header = new Dictionary<string, string> { { "Content-Type", "application/json" } };

        public static APIGatewayProxyResponse GetOkResonse(string body)
        {
            return new APIGatewayProxyResponse()
            {
                Body = body,
                StatusCode = 200,
                Headers = Header
            };
        }

        public static APIGatewayProxyResponse GetOkResonse()
        {
            return new APIGatewayProxyResponse()
            {
                StatusCode = 200,
                Headers = Header
            };
        }

        public static APIGatewayProxyResponse GetErrorResponse(string errorMessage)
        {
            return new APIGatewayProxyResponse()
            {
                Body = errorMessage,
                StatusCode = 500,
                Headers = Header
            };
        }

        public static APIGatewayProxyResponse GetErrorResponse(BackendErrorMessage error)
        {
            return new APIGatewayProxyResponse()
            {
                Body = JsonSerializer.Serialize<BackendErrorMessage>(error),
                StatusCode = 500,
                Headers = Header
            };
        }

        public static APIGatewayProxyResponse GetUnauthorizedResponse()
        {
            return new APIGatewayProxyResponse()
            {
                StatusCode = 401
            };
        }
    }
}