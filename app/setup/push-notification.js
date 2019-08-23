require('dotenv').config({ path: '../../../.env' });

var webPush = require('web-push');
// const functions = require('./app/function.js');

export default function (app) {

    const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
    const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

    webPush.setVapidDetails(process.env.EMAIL, publicVapidKey, privateVapidKey);
    webPush.setGCMAPIKey(process.env.GCMAPIKEY);

    app.post('/subscribe', function (req, res) {
        const subscription = req.body
        res.status(201).json({});
        const payload = JSON.stringify({
            title: 'Push notifications with Service Workers',
        });
        webPush.sendNotification(subscription, payload)
            .then(res =>
                console.log('__ Notification Sent! __', res)
            )
            .catch(error =>
                console.error('__ Notification Error! __', error)
            );
    });
}
