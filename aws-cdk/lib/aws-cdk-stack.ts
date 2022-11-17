import {
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_s3 as s3,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class PortfolioStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // define the S3 bucket that contains all static assets
    const bucket = new s3.Bucket(this, 'PortfolioBucket', {
      // ensure bucket is deleted, including any content, upon destroying the stack
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // define cloudfront distribution and set the origin as the S3 bucket which contains all static assets
    new cloudfront.Distribution(this, 'PortfolioDist', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
      },
    });
  }
}
