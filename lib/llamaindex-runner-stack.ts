import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { AppRunnerConstruct } from "./construct/app-runner-construct";

export class LlamaindexRunnerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);
    new AppRunnerConstruct(this, id, props);
  }
}
