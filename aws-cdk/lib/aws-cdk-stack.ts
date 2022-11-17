import {
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_s3 as s3,
  aws_s3_deployment as s3deploy,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

/**
 * Source: https://aws-cdk.com/deploying-a-static-website-using-s3-and-cloudfront/
 */
export class PortfolioStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // define the S3 websiteBucket that contains all static assets
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      // ensure websiteBucket is deleted, including any content, upon destroying the stack
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    // move static data from local build directory into the S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(path.resolve(__dirname, '../..', 'build'))],
      destinationBucket: websiteBucket,
    });

    // create an origin access identity and associate it with the S3 bucket
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity');
    websiteBucket.grantRead(originAccessIdentity);

    // define cloudfront distribution and set the origin as the S3 websiteBucket which contains all static assets
    new cloudfront.Distribution(this, 'WebsiteDist', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket, { originAccessIdentity }),
      },
    });
  }
}
