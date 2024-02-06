import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ServerlessClamscan } from "cdk-serverless-clamscan";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class CdkClamavStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const clamScan = new ServerlessClamscan(this, "rClamscan", {});
    const bucket = new Bucket(this, "rBucket", {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    clamScan.addSourceBucket(bucket);
    new cdk.CfnOutput(this, "oBucketName", {
      description: "The name of the input S3 Bucket",
      value: bucket.bucketName,
    });
  }
}
