import { Stack } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import * as path from 'path';

export class Lambda extends Construct {
    /**
     *
     */
    constructor(parent:Stack,id:string, cluster:ServerlessCluster) {
        super(parent,id);
        
        const getUploadUrlFunction = new Function(this, 'getUploadUrlFunction', {
            runtime: Runtime.NODEJS_16_X,
            handler: 'app.handler',
            code: Code.fromAsset('lambda/GetUploadUrlFunction/'),
            environment:{
                "AURORA_CLUSTER_ARN":cluster.clusterArn,
                "AURORA_SECRET_ARN":cluster.secret?.secretArn || ''
            }
          });

          cluster.grantDataApiAccess(getUploadUrlFunction);
    }
}