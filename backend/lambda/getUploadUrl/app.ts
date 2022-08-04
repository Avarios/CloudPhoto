import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"

interface GetUploadUrlResponse {
    urls: { fileName: string, uploadUrl: string }[]
}

interface GetUploadUrlRequest{
    files:string[],
    album:string
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
    let ddbDocumentCLient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
    let tableName = process.env.TABLE_NAME || "data";

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

    let body:GetUploadUrlRequest
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        console.error(`Error while parsing body: ${event.body} with error: ${error}`)
        return {
            body: JSON.stringify(error),
            statusCode:500
        }
    }
     
    let files: string[] = [...body.files];
    let getUploadUrlResonse: GetUploadUrlResponse = { urls: [] };
    for (let file of files) {
        let signedUrl = await await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: userSub, Key: file }), { expiresIn: 12600 });
        try {
            saveSignedUrlRequest(ddbDocumentCLient,tableName,signedUrl, file, userSub,body.album,userMail);
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

const saveSignedUrlRequest = async (dbClient:DynamoDBDocumentClient,
    tableName:string, signedUrl: string, fileKey: string, sub: string,album:string,email:string) => {
    await dbClient.send(new PutCommand({
        TableName:tableName,
        Item: {
            PK: `FILE#${fileKey}_${sub}`,
            SK: `FILE#${fileKey}_${sub}`,
            GSI1PK:`USER#${email}ALBUM#${album}`,
            GSI1SK:`FILE#${fileKey}_${sub}`,
            uploadUrl:signedUrl
        }
    }));
}