import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { WorkshopPipelineStage } from './pipeline-stage';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";

export class WorkshopPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // This creates a new CodeCommit repository called 'WorkshopRepo'
    const repo = new codecommit.Repository(this, 'WorkshopRepo', {
      repositoryName: "clout-project-architecture"
    });

    // The basic pipeline declaration. This sets the initial structureof our pipeline
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'clout-project-pipeline',
      crossAccountKeys: true,
      synth: new CodeBuildStep('SynthStep', {
        input: CodePipelineSource.codeCommit(repo, 'main'),
        installCommands: [
          'npm install -g aws-cdk'
        ],
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      }
      )
    });

    const qa = new WorkshopPipelineStage(this, 'Qa',{
      env: {
        account: "782449017468",
        region: "us-east-1"
      }
    });
    const prod = new WorkshopPipelineStage(this, 'Prod',{
      env: {
        account: "427829476435",
        region: "us-east-1"
      }
    });
    const dev = new WorkshopPipelineStage(this, 'Dev',{
      env: {
        account: "366076513585",
        region: "us-east-1"
      }
    });
    pipeline.addStage(dev);
    pipeline.addStage(qa);
    pipeline.addStage(prod);
    


  }
}
