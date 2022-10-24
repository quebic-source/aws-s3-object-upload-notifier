import {LambdaConstructor} from "../../helpers/constructors/lambda-constructor";
import {ProjectConfig} from "../../config/project-config";
import LambdaLayers from "./lambda-layers";

export default class FileUploadTriggerStack {
    private readonly projectConfig: ProjectConfig;

    constructor(lambdaLayers: LambdaLayers) {
        this.projectConfig = new ProjectConfig();

        const envVariables: any = {
            'EMAIL_SUBJECT': this.projectConfig.emailNotifyConfig.subject,
            'SENDER_EMAIL': this.projectConfig.emailNotifyConfig.sender,
            'RECEIVER_EMAILS': this.projectConfig.emailNotifyConfig.receivers,
        };
        new LambdaConstructor('file-upload-trigger', {
            handlerPath: 'file-upload-trigger',
            envVariables: envVariables,
            layers: lambdaLayers.getDefaultLayers(),
        });
    }
}