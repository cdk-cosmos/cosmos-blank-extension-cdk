import { SolarSystemExtensionStack, SolarSystemExtensionStackProps } from '@cdk-cosmos/core';
import { AppGalaxyStack } from '.';

export interface AppSolarSystemProps extends SolarSystemExtensionStackProps {

}

export class AppSolarSystemStack extends SolarSystemExtensionStack {
  readonly galaxy: AppGalaxyStack;

  constructor(galaxy: AppGalaxyStack, id: string, props?: AppSolarSystemProps) {
    super(galaxy, id, {
      portalProps: {
        vpcProps: {
          aZsLookup: true,
        },
      },
      ...props,
    });

    
  }
}