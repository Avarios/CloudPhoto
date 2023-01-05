import { Duration, Stack } from "aws-cdk-lib";
import { Subnet, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { AuroraCapacityUnit, AuroraPostgresEngineVersion, DatabaseClusterEngine, ParameterGroup, ServerlessCluster } from "aws-cdk-lib/aws-rds";

export class Database extends Construct {

    private serverlessCluster: ServerlessCluster;

    constructor(parent: Stack, id: string, vpc: Vpc) {
        super(parent, id);

        // This will be replaced with V2 if V2 is available in CDK
        const cluster = new ServerlessCluster(this, 'AnotherCluster', {
            engine: DatabaseClusterEngine.auroraPostgres({ version: AuroraPostgresEngineVersion.VER_10_20 }),
            vpc,
            scaling: {
                autoPause: Duration.minutes(10), // default is to pause after 5 minutes of idle time
                minCapacity: AuroraCapacityUnit.ACU_2, // default is 2 Aurora capacity units (ACUs)
                maxCapacity: AuroraCapacityUnit.ACU_4, // default is 16 Aurora capacity units (ACUs)
            },
            enableDataApi: true,
            vpcSubnets: vpc.selectSubnets({ subnetGroupName: 'database' })
        });

        this.serverlessCluster = cluster;
    }

    public get DatabaseCluster(): ServerlessCluster {
        return this.serverlessCluster;
    }
}