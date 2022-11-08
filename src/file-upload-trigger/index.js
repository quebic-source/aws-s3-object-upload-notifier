const SESService = require("./ses-service");
const SlackService = require("./slack-service");
const sesService = new SESService();
const slackService = new SlackService();
const fs = require('fs');

const emailNotify = async (bucket, key) => {
    try {
        const message = `<h1></h1><br/>`
            +`<span>Bucket: ${bucket}</span><br/>`
            +`<span>Object: ${key}</span><br/>`;

        let toEmails = process.env.RECEIVER_EMAILS.split(",");
        await sesService.sendEmail({
            senderEmail: process.env.SENDER_EMAIL,
            textContent: message,
            htmlContent: message,
            subject: process.env.EMAIL_SUBJECT,
            toEmails
        })
    } catch (e) {
        console.error('emailNotify failed', e);
    }
}

const slackNotify = async (bucket, key) => {
    try {
        let bucketChannelMap = JSON.parse(fs.readFileSync('bucket-channel-map.json'));
        const channel = bucketChannelMap[bucket];
        if (!channel) {
            throw new Error(`channel not found for ${bucket}`)
        }
        await slackService.sendMessage(`Bucket : *${bucket}*, Object : *${key}*`, channel);
    } catch (e) {
        console.error('slackNotify failed', e);
    }
}

exports.handler = async function (event, context) {
    console.log("event", JSON.stringify(event));
    try {
        const records = event['Records'];
        const record = records[0];
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;
        await emailNotify(bucket, key)
        await slackNotify(bucket, key)
    } catch (err) {
        console.error('error', err);
    }
    return { message: true }
}

