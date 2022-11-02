import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs"
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns"
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export interface FrontendProps extends cdk.StackProps {
    autoscaling: {
        minCapacity: number,
        maxCapacity: number,
        instanceType: ec2.InstanceType,
    },
}
export class CdkWorkshopStack extends cdk.Stack {

    constructor(scope: Construct, id: string, env: string, frontendProps: FrontendProps) {
        super(scope, id, frontendProps);
        // const userData = ec2.UserData.forLinux()
        // const webBuild = new Asset(this, `web-build-${env}`, {
        //     path: 'test-app'
        // });
        // userData.addCommands("sudo apt install awscli -y")
        // userData.addCommands("sudo apt install python3-pip -y")
        // userData.addCommands("pip install flask")

        // userData.addS3DownloadCommand({
        //     bucket: webBuild.bucket,
        //     bucketKey: webBuild.s3ObjectKey,
        //     localFile: "/home/ubuntu/helloworld"
        // })

        // userData.addCommands("sudo apt install unzip -y")
        // userData.addCommands(`unzip -o /home/ubuntu/helloworld/${webBuild.s3ObjectKey}`)
        // userData.addCommands('sudo systemctl restart helloworld')
        const vpc = new ec2.Vpc(this, 'clout-vpc', {
        }) //creates a VPC

        // const privateSubnets = vpc.selectSubnets({
        //     subnetType: ec2.SubnetType.PRIVATE_WITH_NAT
        // });

        // const publicSubnets = vpc.selectSubnets({
        //     subnetType: ec2.SubnetType.PUBLIC
        // });

        // const cloutComputingAsg = new autoscaling.AutoScalingGroup(this, "cloutfrontend-asg", {
        //     vpc: vpc,
        //     instanceType: frontendProps.autoscaling.instanceType,
        //     machineImage: new ec2.GenericLinuxImage({ "us-east-1": "ami-0d837fa72073ab772" },{
        //         userData: userData
        //     }), ///nick's ec2
        //     minCapacity: frontendProps.autoscaling.minCapacity,
        //     maxCapacity: frontendProps.autoscaling.maxCapacity,
        //     vpcSubnets: publicSubnets,
        //     associatePublicIpAddress: true,
        //     keyName: `clout-bastion-${env}`,
        //     updatePolicy: autoscaling.UpdatePolicy.replacingUpdate(),
        //     allowAllOutbound: true,
        // });

        // webBuild.bucket.grantRead(cloutComputingAsg);

        // const cloutFrontendAlb = new alb.ApplicationLoadBalancer(this, "cloutfrontend-alb", {
        //     vpc: vpc,
        //     internetFacing: true,
        //     vpcSubnets: publicSubnets,
        // })

        // const listener = cloutFrontendAlb.addListener('cloutfrontend-listener', {
        //     port: 80
        // })

        // listener.addTargets("cloutfrontend-targets", {
        //     port: 80,
        //     targets: [cloutComputingAsg],
        //     // healthCheck: {
        //     //     enabled: true,
        //     //     healthyHttpCodes: "200"
        //     // },
        // })

        const cluster = new ecs.Cluster(this, "clout-cluster", {
            enableFargateCapacityProviders: true,
            vpc: vpc
        });
        // new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'clout-service', {
        //     cluster: cluster,
        //     memoryLimitMiB: 512,
        //     desiredCount: frontendProps.autoscaling.maxCapacity,
        //     cpu: 256,
        //     protocol: ApplicationProtocol.HTTP,
        //     taskImageOptions: {
        //         image: ecs.ContainerImage.fromAsset('test-app')
        //     }
        // });
    }
}