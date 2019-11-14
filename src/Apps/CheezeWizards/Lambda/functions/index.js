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
        const payload = {
            notification: {
                title: 'Hello FCM',
                body: `${context.params.network}-${context.params.wizardId}-${context.params.challengeId}`
            }
        };
        console.log('notification.title', payload.notification.title);
        console.log('notification.body', payload.notification.body);

        const registrationToken = 'dkXheN2zGHEq7zDNYrpqjU:APA91bEJt1IseBFxNU6j6baGPB_qsRv5MoDbtktZJ5HqJhbHY5nMB8nmyIJCOS9OghFMrj2iog9ata73Wm5cyFqyYqlXhgcQmTmSd40N09sfUYR6XTdObH7Q9eMVjnyLZE8QX77o3eBv';
        const response = await messaging.sendToDevice(registrationToken, payload, {
            priority: "high",
            timeToLive: 60
        });
        // response.results.forEach((result, index) => {
        //     const error = result.error;
        //     if (error) {
        //         console.error('Failure sending notification', error);
        //     }
        // });
        console.log('response', response);

        return Promise.resolve('done');
    });
