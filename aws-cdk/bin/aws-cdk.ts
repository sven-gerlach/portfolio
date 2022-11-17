#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { PortfolioStack } from '../lib/aws-cdk-stack';

const app = new App();
new PortfolioStack(app, 'PortfolioStack', {});
