#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LlamaindexRunnerStack } from "../lib/llamaindex-runner-stack";
import { ContainerStack } from "../lib/container-stack";

const app = new cdk.App();

new ContainerStack(app, "ContainerStack", {});
new LlamaindexRunnerStack(app, "LlamaindexRunnerStack", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
