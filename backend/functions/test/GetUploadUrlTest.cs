
using System.Collections.Generic;

using Xunit;
using Moq;
using Amazon.Lambda.TestUtilities;

using Amazon.S3;
using Amazon.S3.Model;
using System.Text.Json;

namespace cloudphotobackend.Tests
{
    public class FunctionTest
    {
        [Fact]
        public void TestGetUrls_ThreeFiles_ReturnsThreeUrls()
        {

            var s3Mock = new Mock<IAmazonS3>();
            s3Mock.Setup(x => x.GetPreSignedURL(It.IsAny<GetPreSignedUrlRequest>())).Returns("A");
            // Invoke the lambda function and confirm the string was upper cased.
            var function = new GetUploadUrl(s3Mock.Object, "BUCKET");
            var context = new TestLambdaContext();
            var mockEvent = new GetUploadUrlEvent() { FileNames = new List<string> { "A", "B", "C" } };
            var result = function.FunctionHandler(new Amazon.Lambda.APIGatewayEvents.APIGatewayHttpApiV2ProxyRequest() { Body = JsonSerializer.Serialize<GetUploadUrlEvent>(mockEvent) }, context);

            Assert.Equal(200, result.StatusCode);
            var deserBody = JsonSerializer.Deserialize<GetUploadUrlResponse>(result.Body);
            Assert.Equal(3,deserBody.UploadUrls.Count);
        }

        [Fact]
        public void TestGetUrls_ThreeFiles_ReturnsException_S3BucketNotCreated()
        {

            var s3Mock = new Mock<IAmazonS3>();
            s3Mock.Setup(x => x.GetPreSignedURL(It.IsAny<GetPreSignedUrlRequest>())).Throws(new AmazonS3Exception("NOPE"));
            // Invoke the lambda function and confirm the string was upper cased.
            var function = new GetUploadUrl(s3Mock.Object, "BUCKET");
            var context = new TestLambdaContext();
            var mockEvent = new GetUploadUrlEvent() { FileNames = new List<string> { "A", "B", "C" } };
            var result = function.FunctionHandler(new Amazon.Lambda.APIGatewayEvents.APIGatewayHttpApiV2ProxyRequest() { Body = JsonSerializer.Serialize<GetUploadUrlEvent>(mockEvent) }, context);

            Assert.Equal(500, result.StatusCode);
            Assert.Equal("NOPE",result.Body);
        }
    }
}
