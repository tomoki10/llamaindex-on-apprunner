import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ecr from "aws-cdk-lib/aws-ecr";

export class EcrConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const repository = new ecr.Repository(this, `${id}-Ecr`, {
      repositoryName: "llama-index-repo",
      imageScanOnPush: true,
    });
  }
}
