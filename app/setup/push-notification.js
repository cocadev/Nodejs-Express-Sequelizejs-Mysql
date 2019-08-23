import webPush from 'web-push';
// import functions from './app/function.js';
import * as config from '../config/env';

export default function (app) {

    const publicVapidKey = config.PUBLIC_VAPID_KEY;
    const privateVapidKey = config.PRIVATE_VAPID_KEY;

    webPush.setVapidDetails(config.EMAIL, publicVapidKey, privateVapidKey);
    webPush.setGCMAPIKey(config.GCMAPIKEY);

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
