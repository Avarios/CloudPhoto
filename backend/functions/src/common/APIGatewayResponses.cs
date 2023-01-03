using Amazon.Lambda.APIGatewayEvents;

namespace cloudphotobackend
{
    public static class APIGateWayResponse
    {
        public static APIGatewayHttpApiV2ProxyResponse GetOkResonse(string body)
        {
            return new APIGatewayHttpApiV2ProxyResponse()
            {
                Body = body,
                StatusCode = 200
            };
        }

        public static APIGatewayHttpApiV2ProxyResponse GetErrorResponse(string errorMessage)
        {
            return new APIGatewayHttpApiV2ProxyResponse()
            {
                Body = errorMessage,
                StatusCode = 500
            };
        }
    }
}