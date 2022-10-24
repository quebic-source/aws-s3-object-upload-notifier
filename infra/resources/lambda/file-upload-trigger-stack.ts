import {LambdaConstructor} from "../../helpers/constructors/lambda-constructor";
import {ProjectConfig} from "../../config/project-config";
import LambdaLayers from "./lambda-layers";
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import {getResourceName} from "../../helpers/utils/common-utils";

export default class FileUploadTriggerStack {
    private readonly projectConfig: ProjectConfig;

    constructor(lambdaLayers: LambdaLayers) {
        this.projectConfig = new ProjectConfig();

        const envVariables: any = {
            'EMAIL_SUBJECT': this.projectConfig.emailNotifyConfig.subject,
            'SENDER_EMAIL': this.projectConfig.emailNotifyConfig.sender,
            'RECEIVER_EMAILS': this.projectConfig.emailNotifyConfig.receivers,
        };
        const func = new LambdaConstructor('file-upload-trigger', {
            handlerPath: 'file-upload-trigger',
            envVariables: envVariables,
            layers: lambdaLayers.getDefaultLayers(),
        });
        const policy = new aws.iam.Policy(getResourceName("file-upload-policy"), {
            policy: pulumi.output({
                Version: "2012-10-17",
                Statement: [{
                    Action: [
                        "ses:SendEmail",
                        "ses:SendTemplatedEmail",
                        "ses:SendRawEmail",
                        "ses:SendBulkTemplatedEmail"
                    ],
                    Resource: ["*"], // TODO
                    Effect: "Allow",
                }],
            }),
        });
        new aws.iam.RolePolicyAttachment(`file-upload-policy-att`, {
            role: func.lambdaFunc.role,
            policyArn: policy.arn,
        });
    }
}