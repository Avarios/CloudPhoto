import { Stack } from "aws-cdk-lib";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class Network extends Construct {

    private Vpc: Vpc;

    constructor(parent: Stack, id: string) {
        super(parent, id);

        const vpc = new Vpc(parent, 'CloudPhotoVpc', {
            maxAzs: 2,
            vpcName: 'CloudPhotoVpc',
            cidr: '124.0.0.0/16',
            subnetConfiguration: [
                {
                    cidrMask: 20,
                    name: 'database',
                    subnetType: SubnetType.PRIVATE_ISOLATED,
                }]
        })

        this.Vpc = vpc;
    }

    get DefaultVpc(): Vpc {
        return this.Vpc;
    }
}