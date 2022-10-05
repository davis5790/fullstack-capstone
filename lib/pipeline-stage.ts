import { CdkWorkshopStack } from './cdk-workshop-stack';
import { Construct } from 'constructs';
import { Stage, CfnOutput, StageProps } from 'aws-cdk-lib';

export class WorkshopPipelineStage extends Stage {


  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    new CdkWorkshopStack(this, 'WebService');

  }
}
