const { WebClient, LogLevel } = require("@slack/web-api");

class SlackService {
    constructor() {
        this.client = new WebClient(process.env.SLACK_TOKEN, {
            // LogLevel can be imported and used to make debugging simpler
            logLevel: LogLevel.INFO
        });
    }

    async sendMessage(text, channel) {
        let params = {
            mrkdwn: true,
            channel,
            text,
        };
        const result = await this.client.chat.postMessage(params);
        console.log(result);
        console.log("sendMessage")
    }
}

module.exports = SlackService;