import * as cdk from '@aws-cdk/core';
import {AccountPrincipal, Role} from '@aws-cdk/aws-iam';
import {Bucket} from "@aws-cdk/aws-s3";
import {Duration} from "@aws-cdk/core";

interface CradleProps {
  stage: string
}

export class CradleStack extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: CradleProps) {
    super(scope, id);

    const servicePrefix = 'fons-occupancy-heina';
    const cradleS3AccountId = '000000000'; //add an account id
    const cradleAccessRole = new Role(this, 'CradleEmployeeExportRole', {
      roleName: `${servicePrefix}-${props.stage}-cradleAccessRole`,
      assumedBy: new AccountPrincipal(cradleS3AccountId),
      description: 'Cradle EDX access role export to Kinesis'
    });

    const bucket = new Bucket(this, 'CradleEmployeeExportBucket', {
      bucketName: `${servicePrefix}-${props.stage}-employee-bucket`,
      lifecycleRules: [
        {
          id: `${servicePrefix}-${props.stage}-employee-bucket-rule`,
          expiration: Duration.days(2)
        },
      ],
    });

    bucket.grantReadWrite(cradleAccessRole);


  }
}
