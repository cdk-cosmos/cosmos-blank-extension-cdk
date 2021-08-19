import { Construct, StackProps } from "@aws-cdk/core";
import { CosmosExtensionStack } from "@cdk-cosmos/core";

export class AppCosmosStack extends CosmosExtensionStack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

  }
}
