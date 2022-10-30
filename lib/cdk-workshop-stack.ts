import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as autoscaling from "aws-cdk-lib/aws-autoscaling";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as alb from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as rds from "aws-cdk-lib/aws-rds";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3assets from "aws-cdk-lib/aws-s3-assets";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import * as path from "path";
import { Distribution, OriginAccessIdentity } from "@aws-cdk/aws-cloudfront";
import { S3Origin } from "@aws-cdk/aws-cloudfront-origins";

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

        const privateSubnets = vpc.selectSubnets({
            subnetType: ec2.SubnetType.PRIVATE_WITH_NAT
        }); 

        const publicSubnets = vpc.selectSubnets({
            subnetType: ec2.SubnetType.PUBLIC
        });

        const cloutComputingAsg = new autoscaling.AutoScalingGroup(this, "cloutfrontend-asg", {
            vpc: vpc,
            instanceType: frontendProps.autoscaling.instanceType,
            machineImage: new ec2.GenericLinuxImage({"us-east-1": "ami-0d837fa72073ab772"}), ///nick's ec2
                //userData: userData // do i want to use cloutclout userdata?
            minCapacity: frontendProps.autoscaling.minCapacity,
            maxCapacity: frontendProps.autoscaling.maxCapacity,
            vpcSubnets: privateSubnets,
            keyName: `clout-bastion-${env}`,
            updatePolicy: autoscaling.UpdatePolicy.replacingUpdate(),
            allowAllOutbound: false,
        });

        const cloutFrontendAlb = new alb.ApplicationLoadBalancer(this, "cloutfrontend-alb", {
            vpc: vpc,
            internetFacing: true,
            vpcSubnets: publicSubnets,
        })

        const listener = cloutFrontendAlb.addListener('cloutfrontend-listener', {
            port: 80
        })

        listener.addTargets("cloutfrontend-targets", {
            port: 80,
            targets: [cloutComputingAsg],
            // healthCheck: {
            //     enabled: true,
            //     // requesting / upsets episerver as it cannot resolve a site based on host header
            //     path: "/status",
            //     healthyHttpCodes: "200"
            // },
        })
    }
}