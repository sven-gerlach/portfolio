# Portfolio

## Local Development & Deployment Flow
1. Create local directory: `mkdir portfolio-website && cd portfolio-website`
2. Clone remote: `git clone git@github.com:sven-gerlach/portfolio.git`
3. Manually configure GitHub as the identity provider to AWS (see [aws-cdk](./aws-cdk/README.md#CI/CD Deployment Pipeline)) 
4. Create local dev branch and pull the latest branch from the remote: `git switch dev && git pull`
5. Develop in local dev branch and push to remote
6. Submit PR from dev branch to main branch
7. Wait for CI/CD GitHub actions test workflow to succeed ([test.yml](./.github/workflows/test.yml))
8. Approve PR
9. Wait for CI/CD GitHub actions deploy workflow to complete ([deploy.yml](./.github/workflows/deploy.yml))
10. The app is now deployed and can be accessed via the [Cloudfront CDN URL](https://dmbmikfdfa5id.cloudfront.net)

## AWS-CDK
More detail on the AWS architecture can be found [here](aws-cdk/README.md).

## Config/Setup
This app has been built from the ground up.

### Webpack
The [config](./config) directory contains all the webpack settings which are split into common, dev and prod modules.

### Babel
The [.babelrc](./.babelrc) file doesn't serve a greater purpose except for a couple of plugins and presets.

### Husky
The [Husky pre-commit hook](./.husky/pre-commit) has been set up to run prior to every `git commit` operation and 
runs `npx lintstaged`

### Lint-Staged
[Lint-staged](./.lintstagedrc.json) has been set up to run prettier and eslint for all relevant files in the /src 
directory and prettier for all relevant files in the /aws-cdk directory.

### NVM/Node Version
The [.nvmrc](./.nvmrc) documents the stable node/npm version that ought to be used. Care should be given that the 
node version in the GitHub Actions CI/CD [pipeline workflows](./.github/workflows) is the same.

### index.d.ts
The file [index.d.ts](./index.d.ts) stipulates that image imports are to be treated as modules.