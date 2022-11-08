beforeEach(() => {
    jest.resetModules();
    process.env = {
        AWS_REGION: 'us-east-1',
        EMAIL_SUBJECT: 'S3 Upload Notify',
        SENDER_EMAIL: 'tharanganilupul@gmail.com',
        RECEIVER_EMAILS: 'tharanganilupul@gmail.com,botcircuits4@gmail.com',
        SLACK_TOKEN: 'xoxb-3169629278769-4292070489399-B5x5RNamNzmmDtnrO5N8UNMA',
        SLACK_CHANNEL: 'C034M0SQX35'
    };
});

test('success test', async () => {
    const func = require("../../src/file-upload-trigger");
    const event = {
        "Records": [
            {
                "eventVersion": "2.1",
                "eventSource": "aws:s3",
                "awsRegion": "us-east-1",
                "eventTime": "2022-11-08T22:46:25.736Z",
                "eventName": "ObjectCreated:Put",
                "userIdentity": {
                    "principalId": "A1BASA2MOHN0I4"
                },
                "requestParameters": {
                    "sourceIPAddress": "24.78.189.82"
                },
                "responseElements": {
                    "x-amz-request-id": "TZVZKAE3TZGJW0PQ",
                    "x-amz-id-2": "CQ2sO9u80g2SlDaz7Lj6kxh8H9lNMcAxzYPth3RY+Lrjh+dwPwXKswf1sYCjn9bm85GWCi+lkpG8jBukjI9D952RfKqKzlH1"
                },
                "s3": {
                    "s3SchemaVersion": "1.0",
                    "configurationId": "8af3a2e5-4cab-41b0-82a9-f7ef90e7f86e",
                    "bucket": {
                        "name": "athena-demo-test-1",
                        "ownerIdentity": {
                            "principalId": "A1BASA2MOHN0I4"
                        },
                        "arn": "arn:aws:s3:::athena-demo-test-1"
                    },
                    "object": {
                        "key": "Screen+Shot+2022-11-07+at+2.28.23+PM+%282%29.png",
                        "size": 245361,
                        "eTag": "6c683c9895e3a81364b3531c1fdd187b",
                        "sequencer": "00636ADC41A3855911"
                    }
                }
            }
        ]
    };
    const acctual = await func.handler(event, {});
    console.log(acctual.message)
    expect(acctual.message).toEqual(true);
}, 30000);


test('trigger', async () => {
    const func = require("../../src/file-upload-trigger");
    const event = {
        "Records": [
            {
                "s3": {
                    "object": {
                        "key": "test.png"
                    }
                }
            }
        ]
    };
    const acctual = await func.handler(event, {});
    console.log(acctual)
}, 30000);