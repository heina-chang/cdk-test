import * as cdk from '@aws-cdk/core';
import {CradleStack} from './cradleStack';


export class CdkTestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const stage = 'beta';

    new CradleStack(this, 'cradleConstruct', {
      stage: stage
    });

  }
}
