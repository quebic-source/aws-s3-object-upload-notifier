const AWS = require("aws-sdk");

class SESService {
    constructor() {
        this.sesClient = new AWS.SES();
    }

    async sendEmail({ senderEmail, toEmails, subject, textContent, htmlContent }) {
        var params = {
            Destination: {
                ToAddresses: toEmails
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: htmlContent
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: textContent
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject
                }
            },
            Source: senderEmail
        };
        return await this.sesClient.sendEmail(params).promise();
    }
}

module.exports = SESService;