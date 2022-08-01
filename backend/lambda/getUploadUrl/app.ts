import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { S3RequestPresigner, getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

interface GetUploadUrlResponse {
    urls: { fileName: string, uploadUrl: string }[]
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let userSub = event.requestContext.authorizer?.jwt.claims.sub;
    let userMail = event.requestContext.authorizer?.jwt.claims.email;
    let s3Client = new S3Client({});

    if (userSub == null) {
        return {
            body: 'No sub was provided',
            statusCode: 401
        }
    };

    if (event.body == null) {
        return {
            body: 'No body provided',
            statusCode: 400
        }
    };

    let files: string[] = [...event.body];
    let getUploadUrlResonse: GetUploadUrlResponse = { urls: [] };
    for (let file of files) {
        let signedUrl = await await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: userSub, Key: file }), { expiresIn: 12600 });
        try {
            saveSignedUrlRequest(signedUrl, file, userMail);
        } catch (error) {
            console.error(error);
            return {
                body: JSON.stringify(error),
                statusCode: 500
            }
        }
        getUploadUrlResonse.urls.push({fileName:file,uploadUrl:signedUrl});
    }

    return {
        body: JSON.stringify(getUploadUrlResonse),
        statusCode: 200,
    }
};

const saveSignedUrlRequest = (signedUrl: string, fileKey: string, userMail: string) => {

}


