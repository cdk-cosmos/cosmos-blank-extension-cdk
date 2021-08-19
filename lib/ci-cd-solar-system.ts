import { Stack } from '@aws-cdk/core';
import { SolarSystemExtensionStack, SolarSystemExtensionStackProps, CiCdFeatureExtensionStack } from '@cdk-cosmos/core';
import { AppGalaxyStack } from '.';
//import { StandardPipeline } from '@cosmos-building-blocks/pipeline';

export class AppCiCdSolarSystemStack extends SolarSystemExtensionStack {
  readonly galaxy: AppGalaxyStack;
  readonly ciCd: CiCdFeatureExtensionStack;
  //readonly codePipeline: StandardPipeline;

  constructor(galaxy: AppGalaxyStack, props?: SolarSystemExtensionStackProps) {
    super(galaxy, 'CiCd', {
      portalProps: {
        vpcProps: {
          aZsLookup: true,
        },
      },
      ...props
    });

    //This creates all the resources of the CiCd feature extension stack and gives you a way to reference them (through the this.ciCd field)
    this.addCiCd();

    //can add codeRepo, ecrRepo here
    // const { codeRepo, ecrRepo } = this.galaxy.cosmos;
    
    /**
     * Choose between docker, node or standard pipeline
     * Place pipeline code below, import at the top of the file and add `readonly codePipeline: StandardPipeline;` to exports, before the constructor
     * link.com/pipelines
     */

    //  //if using std pipeline, you'll need a makefile in your app code
    // this.codePipeline = new StandardPipeline(this, 'CodePipeline', {
    //   pipelineName: this.galaxy.cosmos.nodeId('Code-Pipeline', '-'),
    //   buildName: this.galaxy.cosmos.nodeId('Code-Build', '-'),
    //   codeSource: sourceProvider,//this is the code repo defined in cosmos.ts or github enterprise
    //   buildSpec: StandardPipeline.DefaultBuildSpec(),//std pipeline comes with default buildspec. can define custom one if needed
    // });

  }

//defined here so you can add stages to cdk pipeline from bin/main.ts
  addCdkDeployEnvStageToCdkPipeline(props: { name: string; stacks: Stack[]; isManualApprovalRequired?: boolean }) {
    this.ciCd.addDeployStackStage({
      ...props,
      pipeline: this.ciCd.cdkPipeline.pipeline,
    });
  }

//defined here so you can add stages to code pipeline from bin/main.ts. 
//Uncomment once pipeline type has been selected and imported. Update envs to reflect correct pipeline
  // addCdkDeployEnvStageToCodePipeline(props: { name: string; stacks: Stack[]; isManualApprovalRequired?: boolean }) {
  //   this.ciCd.addDeployStackStage({
  //     ...props,
  //     pipeline: this.codePipeline.pipeline,
  //     envs: StandardPipeline.DefaultAppBuildVersionStageEnv(),//passes app build version, check pipeline type matches imports
  //   });
  // }
}
