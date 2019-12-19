import env from '../../../../../env'
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(env.firebaseConfig),
    databaseURL: 'https://alice-1555232535074.firebaseio.com'
});

const messaging = admin.messaging();
module.exports = new class NotificationService {
    sendNotification(registrationToken, title, body, data) {
        const payload = {
            token: registrationToken,
            notification: {
                title,
                body
            },
            data
        };
        return messaging.send(payload);
    }
};
