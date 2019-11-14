const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('./_keys/adminsdk-keys')),
    databaseURL: 'https://alice-1555232535074.firebaseio.com'
});

const messaging = admin.messaging();
exports.challengeNotifier = functions.firestore
    .document('wizards/network/{network}/{wizardId}/duel/{challengeId}')
    .onWrite(async (change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.
        const document = change.after.exists ? change.after.data() : null;

        // Get an object with the previous document value (for update or delete)
        const oldDocument = change.before.data();

        // perform desired operations ...
        console.log('was delete?', document === null);
        console.log('network', context.params.network);
        console.log('wizard id', context.params.wizardId);
        console.log('challenge id', context.params.challengeId);

        // Send message using Firebase Cloud Messaging
        console.log('Constructing a FCM payload...');
        const registrationToken = 'd6OLxN1_tYxeIQKpJa54NG:APA91bEmfEC7ddh9IavojX6ukPhtnqyODhs1qD8Hdv8zqL1CAjr71EiW6N3q2gaLz5BcnuswkuS5KYFZGMgRgcOTUmUREJfS1Yfx5S8JgZk4kgnUhYsSYTA4QGd5tpHDLSuQNab8n2b4';
        console.log('registrationToken', registrationToken);
        const payload = {
            token: registrationToken,
            notification: {
                title: 'Hello Mark!',
                body: `Challenge issued on ${context.params.network}. Wizard ID: ${context.params.wizardId}. Challenge: ${context.params.challengeId}`
            }
        };
        console.log('notification.title', payload.notification.title);
        console.log('notification.body', payload.notification.body);
        const response = await messaging.send(payload);
        // response.results.forEach((result, index) => {
        //     const error = result.error;
        //     if (error) {
        //         console.error('Failure sending notification', error);
        //     }
        // });
        console.log('response', response);

        return Promise.resolve('done');
    });
