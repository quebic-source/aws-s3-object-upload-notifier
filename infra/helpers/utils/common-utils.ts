import * as pulumi from "@pulumi/pulumi";
import {ProjectConfig} from "../../config/project-config";

const projectConfig = new ProjectConfig();

export function getResourceName(resourceIdentifier: string) {
    return `${projectConfig.resourceNamePrefix}-${pulumi.getStack()}-${resourceIdentifier}`;
}