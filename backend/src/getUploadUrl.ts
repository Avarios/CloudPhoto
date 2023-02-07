import { Handler, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>

type GetUploadEvent = {
    Files:string[],
    FolderName:string
}

const APPLICATION_BUCKET = process.env.BUCKET_NAME;
const EXPIRETIME_PER_FILE:number = Number.parseInt(process.env.EXPIRETIME_PER_FILE ?? "5");
const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE;
const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({  }));

export const handler: ProxyHandler = async (event, context) => {
    if(!APPLICATION_BUCKET){
        return {
            statusCode:500,
            body:'Bucket is missing, please contact your administrator'
        }
    }
    if(!event.headers["Cloudphoto.User"]) {
        return {
            statusCode:400,
            body:'No User attached'
        }
    }

    const preSignedUrls:string[] = [];

    try {
        const client = new S3Client({});
        if(!event.body){
            return {
                body: 'No Body attached',
                statusCode: 400
            }
        }
        const fileEvent:GetUploadEvent = JSON.parse(event.body)
        for (let file of fileEvent.Files) {
            const command = new PutObjectCommand({ Bucket: APPLICATION_BUCKET,Key: `${event.headers["Cloudphoto.User"]}/${fileEvent.FolderName}/${file}` });
            preSignedUrls.push(await getSignedUrl(client,command,{ expiresIn:fileEvent.Files.length * EXPIRETIME_PER_FILE }));
        }
    } catch (error) {
        console.error(error);
        return {
            body:JSON.stringify(error),
            statusCode:500
        }
    }
    return {
        statusCode:200,
        body: JSON.stringify(preSignedUrls)
    }
};

const saveFileInformation = (filename:string, folder:string,userId:string) => {
    dynamoDbClient.send(new PutItemCommand({
        Item
    }))
}
