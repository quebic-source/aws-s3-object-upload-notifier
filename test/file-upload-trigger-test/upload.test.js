beforeEach(() => {
    jest.resetModules();
    process.env = {
        AWS_REGION: 'us-east-1',
        EMAIL_SUBJECT: 'S3 Upload Notify',
        SENDER_EMAIL: 'tharanganilupul@gmail.com',
        RECEIVER_EMAILS: 'tharanganilupul@gmail.com,botcircuits4@gmail.com'
    };
});

test('success test', async () => {
    const func = require("../../src/file-upload-trigger");
    const event = {
        Records: [
            {
                s3: {
                    bucket: {
                        name: 'test-bucket',
                    },
                    object: {
                        key: 'obj-1'
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