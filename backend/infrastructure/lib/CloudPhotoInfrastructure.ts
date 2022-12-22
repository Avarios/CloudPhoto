import { CfnParameter, Stack, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Infrastructure extends Stack {

  public GoogleClientId:string;
  public GoogleClientSecret:string;
  public CognitoDomain:string;
  public CognitoSenderMail:string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    Tags.of(this).add('stack', this.stackName, {
      applyToLaunchedInstances: true
    });
  }
}
