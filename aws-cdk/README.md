# AWS-CDK TypeScript App

## Infrastructure as Code
The stack module [aws-cdk-stack.ts](./lib/aws-cdk-stack.ts) effectuates four specific tasks to deploy the portfolio 
websites static assets to the AWS CLoudfront CDN.
1. Define and create the S3 bucket that contains all static assets
2. Move all static assets from local build directory into the created S3 bucket
3. Create an origin access identity and associate it with the S3 bucket. This ensures that only Cloudfront can use 
   the static assets stored in the S3 bucket (bucket content is not publicly accessible)
4. Define and create Cloudfront distribution and set the origin as the S3 bucket containing the static assets

## Configuration for Development and Deployment
### Local Development
1. Run `npm i`
2. Run `npm cdk --version` to check AWS-CDK was successfully installed (consider installing aws-cdk globally)
3. Either run `aws configure` or manually adjust the AWS config and credentials files (see [AWS docs](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html))

### CI/CD Deployment Pipeline
1. Setup GitHub as an [identity provider](https://docs.aws.amazon.
   com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) on AWS by:
   1. Retrieve the "Provider URL" and "Audience" from [GitHub](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
   2. Following the instructions for [Creating 
      and managing an OIDC provider](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html#manage-oidc-provider-console)
2. Store the created 'role-to-assume' and your preferred 'aws-region' variables as confidential GitHub repository 
   variables (the "deploy" workflow needs to have access to both)

## Useful commands
- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
