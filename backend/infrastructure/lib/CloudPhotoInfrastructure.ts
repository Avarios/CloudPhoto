import { Stack, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface InfrastructureProps {
  // Define construct properties here
}

export class Infrastructure extends Stack {

  constructor(scope: Construct, id: string, props: InfrastructureProps = {}) {
    super(scope, id);

    Tags.of(this).add('stack', this.stackName, {
      applyToLaunchedInstances: true
    });
  }
}
