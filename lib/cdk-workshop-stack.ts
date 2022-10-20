import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Bucket, BucketAccessControl} from 'aws-cdk-lib/aws-s3';
import {S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import {Distribution} from 'aws-cdk-lib/aws-cloudfront'

export class CdkWorkshopStack extends cdk.Stack {
  public readonly hcViewerUrl: cdk.CfnOutput;
  public readonly hcEndpoint: cdk.CfnOutput;
  
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
     super(scope, id, props);
     
     const bucket = new Bucket(this, 'Bucket', { //create bucket to host site
       accessControl: BucketAccessControl.PRIVATE,
     })
     new Distribution(this, 'myDist', { //create cloudfront distribution
      defaultBehavior: { origin: new S3Origin(bucket) },//origin being the bucket above
    });
    

    const hello = new lambda.Function(this, 'HelloHandler', {//lambda function
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
    });
  }
}


