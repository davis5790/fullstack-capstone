import { App } from 'aws-cdk-lib';
import { WorkshopPipelineStack } from "../lib/pipeline-stack";

const app = new App();
new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack', {
    env: {
        account: "226115143550",
        region: "us-east-1"
    }    
});
