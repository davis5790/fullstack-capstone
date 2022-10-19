import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Bucket, BucketAccessControl} from 'aws-cdk-lib/aws-s3';

export class CdkWorkshopStack extends cdk.Stack {
  public readonly hcViewerUrl: cdk.CfnOutput;
  public readonly hcEndpoint: cdk.CfnOutput;
  
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
     super(scope, id, props);
     const bucket = new Bucket(this, 'Bucket', {
       accessControl: BucketAccessControl.PRIVATE,
     })
    

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
    });
  }
}


