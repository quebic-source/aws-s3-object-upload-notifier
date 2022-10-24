import LambdaLayers from "./resources/lambda/lambda-layers";
import FileUploadTriggerStack from "./resources/lambda/file-upload-trigger-stack";

const lambdaLayers = new LambdaLayers();
new FileUploadTriggerStack(lambdaLayers);
