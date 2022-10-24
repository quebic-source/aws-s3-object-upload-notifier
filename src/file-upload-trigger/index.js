
const SESService = require("./ses-service");
const sesService = new SESService();

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

exports.handler = async function (event, context) {
    console.log("event", JSON.stringify(event));
    try {
        const records = event['Records'];
        const record = records[0];
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;
        await emailNotify(bucket, key)
    } catch (err) {
        console.error('error', err);
    }
    return { message: true }
}

