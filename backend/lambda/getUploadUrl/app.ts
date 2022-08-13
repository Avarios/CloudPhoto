import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { ExecuteStatementCommand, RDSDataClient } from '@aws-sdk/client-rds-data';

interface GetUploadUrlResponse {
    urls: { fileName: string, uploadUrl: string }[]
}

interface GetUploadUrlRequest {
    files: string[],
    album: string
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

const DATABASE_NAME = 'CloudPhoto';
const FILETABLE_NAME = 'Files';
const AURORA_SECRET_ARN = process.env.AURORA_SECRET_ARN || "SECRETARN";
const AURORA_CLUSTER_ARN = process.env.AURORA_CLUSTER_ARN || "CLUSTER";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userSub = event.requestContext.authorizer?.jwt.claims.sub;
    const userMail = event.requestContext.authorizer?.jwt.claims.email;
    const s3Client = new S3Client({});

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

    let body: GetUploadUrlRequest
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        console.error(`Error while parsing body: ${event.body} with error: ${error}`)
        return {
            body: JSON.stringify(error),
            statusCode: 500
        }
    }

    let files: string[] = [...body.files];
    let getUploadUrlResonse: GetUploadUrlResponse = { urls: [] };
    for (let file of files) {
        let signedUrl = await await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: userSub, Key: file }), { expiresIn: 12600 });
        try {
            saveSignedUrlRequest(signedUrl, file, userSub, body.album, userMail);
        } catch (error) {
            console.error(error);
            return {
                body: JSON.stringify(error),
                statusCode: 500
            }
        }
        getUploadUrlResonse.urls.push({ fileName: file, uploadUrl: signedUrl });
    }

    return {
        body: JSON.stringify(getUploadUrlResonse),
        statusCode: 200,
    }
};

const saveSignedUrlRequest = async (signedUrl: string, fileKey: string, sub: string, album: string, email: string) => {
    /*  TODO:
    const executePut = new ExecuteStatementCommand(
        {
            resourceArn: AURORA_CLUSTER_ARN,
            secretArn: AURORA_SECRET_ARN,
            database: DATABASE_NAME,
            sql: 'select * from bla'
        });
    const client = new RDSDataClient({ logger: console });
    try {
        const result = await client.send(executePut);
    } catch (error) {
        console.error(JSON.stringify(error));
    }
    */
}