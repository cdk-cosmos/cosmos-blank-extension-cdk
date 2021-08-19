#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { AppCosmosStack, AppGalaxyStack, AppSolarSystemStack, AppCiCdSolarSystemStack } from '../lib';

// Cdk App
export const app = new App();

// AWS Env Config
const mgtEnvConfig = { account: '1111', region: 'ap-southeast-2' };
const devEnvConfig = { account: '2222', region: 'ap-southeast-2' };

// Extend the Cosmos + Add our App bits
const cosmos = new AppCosmosStack(app, 'Demo', {
  env: mgtEnvConfig,
});

// Extend the Mgt Galaxy
const mgtGalaxy = new AppGalaxyStack(cosmos, 'Mgt');

// Extend the CiCd SolarSystem, adding our App CiCd pipeline
const ciCd = new AppCiCdSolarSystemStack(mgtGalaxy);

// Extends the Dev Galaxy
const devGalaxy = new AppGalaxyStack(cosmos, 'Dev', {
  env: devEnvConfig,
});

/**
 * The solar systems below this section must be commented out when the bootstrapper runs initially, as the resources they need have not been created. 
 * Uncomment when pushing code to the newly created cdk repo and re-run the pipeline to create these solar systems
 * 
 * This may be resolved in future versions of Cosmos with the new cdk pipeline
 */

// // Extend the Dev SolarSystem, by creating service
// const dev = new AppSolarSystemStack(devGalaxy, 'Dev', {
//   //pass whatever AppSolarSystemProps is expecting in solar-system.ts
// });

// // Optionally, add a Deployment stage in App Pipeline to target this SolarSystem. Otherwise all will be deployed in final stage of pipeline
// ciCd.addCdkDeployEnvStageToCodePipeline({
//   name: 'DeployDev',
//   stacks: [dev],
//   isManualApprovalRequired: false,
// });

