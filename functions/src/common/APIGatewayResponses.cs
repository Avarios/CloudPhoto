using Amazon.Lambda.APIGatewayEvents;
using System;
using System.Text.Json;

namespace Common
{
    public static class APIGateWayResponse
    {
        public static APIGatewayProxyResponse GetOkResonse(string body)
        {
            return new APIGatewayProxyResponse()
            {
                Body = body,
                StatusCode = 200
            };
        }
        public static APIGatewayProxyResponse GetErrorResponse(string errorMessage)
        {
            return new APIGatewayProxyResponse()
            {
                Body = JsonSerializer.Serialize(errorMessage),
                StatusCode = 500
            };
        }
    }
}