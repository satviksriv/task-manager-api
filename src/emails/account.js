const SibApiV3Sdk = require('sib-api-v3-sdk');

const sibApiKey = process.env.SIB_API_KEY;

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = sibApiKey;

const sendWelcomeEmail = (email, name) => {
    console.log(process.env.SIB_API_KEY);
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        subject: "Thanks for joining in!",
        sender: { "email": "rishabhsatvik2013@gmail.com", "name": "Satvik Srivastava" },
        replyTo: { "email": "rishabhsatvik2013@gmail.com", "name": "Satvik Srivastava" },
        to: [{ "name": name, "email": email }],
        htmlContent: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    });
}

const sendCancelationEmail = (email, name) => {
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        subject: "Sorry to see you go!",
        sender: { "email": "rishabhsatvik2013@gmail.com", "name": "Satvik Srivastava" },
        replyTo: { "email": "rishabhsatvik2013@gmail.com", "name": "Satvik Srivastava" },
        to: [{ "name": name, "email": email }],
        htmlContent: `Goodbye, ${name}. I hope to see you back sometime soon.`,
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}