import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apprunner from "@aws-cdk/aws-apprunner-alpha";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ecr from "aws-cdk-lib/aws-ecr";

export class AppRunnerConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const instanceRole = new iam.Role(scope, `${id}-InstanceRole`, {
      assumedBy: new iam.ServicePrincipal("tasks.apprunner.amazonaws.com"),
    });
    instanceRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["ssm:GetParameter"],
        effect: iam.Effect.ALLOW,
        resources: [`arn:aws:ssm:${props?.env?.region}:${props?.env?.account}:parameter/OpenAiApiKey`],
      })
    );

    new apprunner.Service(this, `${id}-Service`, {
      serviceName: `llama-runner`,
      cpu: apprunner.Cpu.ONE_VCPU,
      memory: apprunner.Memory.TWO_GB,
      source: apprunner.Source.fromEcr({
        imageConfiguration: { port: 5601 },
        repository: ecr.Repository.fromRepositoryName(this, `${id}-LlamaIndexRepo`, "llama-index-repo"),
        tagOrDigest: "v1",
      }),
      instanceRole,
    });
  }
}
