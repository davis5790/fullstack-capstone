import { FrontendProps, CdkWorkshopStack } from './cdk-workshop-stack';
import { Construct } from 'constructs';
import { Stage, CfnOutput, StageProps } from 'aws-cdk-lib';
import { env } from 'process';

export class WorkshopPipelineStage extends Stage {
  stack: CdkWorkshopStack

  constructor(scope: Construct, env: string, frontendProps: FrontendProps) {
    super(scope, env, frontendProps);
    this.stack = new CdkWorkshopStack(this, "frontend", env, frontendProps);

  }
}
