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
      
        const vpc = new ec2.Vpc(this, 'clout-vpc', {
        }) //creates a VPC

        const cluster = new ecs.Cluster(this, "clout-cluster", {
            enableFargateCapacityProviders: true,
            vpc: vpc
        });
        new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'clout-service', {
            cluster: cluster,
            memoryLimitMiB: 512,
            desiredCount: frontendProps.autoscaling.maxCapacity,
            cpu: 256,
            protocol: ApplicationProtocol.HTTP,
            taskImageOptions: {
                image: ecs.ContainerImage.fromAsset('test-app')
            }
        });
    }
}