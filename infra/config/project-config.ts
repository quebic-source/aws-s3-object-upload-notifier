import * as pulumi from "@pulumi/pulumi";

export interface EmailNotifyConfigType {
    subject: string;
    sender: string;
    receivers: string;
}

export class ProjectConfig {
    private readonly _env: string;
    private readonly _projectName: string;
    private readonly _accountId: string;
    private readonly _region: string;
    private readonly _resourceNamePrefix: string;
    private readonly _emailNotifyConfig: EmailNotifyConfigType;

    constructor() {
        const config = new pulumi.Config("project");
        this._env = pulumi.getStack();
        this._projectName =  pulumi.getProject();
        this._accountId = new pulumi.Config("aws").requireObject<string[]>("allowedAccountIds")[0];
        this._region = new pulumi.Config("aws").require("region");
        this._emailNotifyConfig = config.requireObject<EmailNotifyConfigType>("emailNotify");
        this._resourceNamePrefix = config.require<string>("resourceNamePrefix");
    }

    public get env(): string {
        return this._env;
    }

    public get projectName(): string {
        return this._projectName;
    }

    public get accountId(): string {
        return this._accountId;
    }

    public get region(): string {
        return this._region;
    }

    public get emailNotifyConfig(): EmailNotifyConfigType {
        return this._emailNotifyConfig;
    }

    public get resourceNamePrefix(): string {
        return this._resourceNamePrefix;
    }
}
