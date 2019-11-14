const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('./_keys/adminsdk-keys')),
    databaseURL: 'https://alice-1555232535074.firebaseio.com'
});

const messaging = admin.messaging();

function notifyChallengeRevoked(registrationToken, wizardId, network) {
    const payload = {
        token: registrationToken,
        notification: {
            title: 'Duel Challenge Revoked!',
            body: `[[${network}]] Your wizard (${wizardId}) is no longer challenged to a duel`
        },
        data: {
            wizardId
        }
    };
    return messaging.send(payload);
}

function notifyNewChallengeReceived(registrationToken, wizardId, network) {
    const payload = {
        token: registrationToken,
        notification: {
            title: 'New Duel Challenge!',
            body: `[[${network}]] Your wizard (${wizardId}) has been challenged to a duel`
        },
        data: {
            wizardId
        }
    };
    return messaging.send(payload);
}

function notifyChallengeUpdated(registrationToken, wizardId, network) {

}

function notifyChallengedWizard(document, notifyFn, registrationToken, wizardId, network) {
    console.log('Asserting not challenger...');
    let processor = Promise.resolve('done');
    if (!document.challenger) {
        console.log('Proceeding as not the challenging wizard');
        processor = notifyFn(registrationToken, wizardId, network);
        console.log('Notifying the owner of the challenged wizard');
    } else {
        console.log('Finishing as this is the challenging wizard');
    }
    return processor;
}

//todo: this is temp - remove it
const registrationToken = 'esrFsgLnRB4l8NHuQrpilt:APA91bE_vxfYgOrvY-Vp8FXHrRBBoxRK76pCJpZxap8lYtgPPZXiHsgwTHkbB2RnqGxSn34LyGGU16LPiNXzPzfuMXTolJpqCKtNWmWO8kMpfq-IJ-xfWpdhiiN1Vo14JpM9xui_aMdQ';
exports.challengeNotifier = functions.firestore
    .document('wizards/network/{network}/{wizardId}/duel/{challengeId}')
    .onWrite(async (change, context) => {
        console.log('**Executing challenge notifier**');

        const network = context.params.network;
        const wizardId = context.params.wizardId;
        const challengeId = context.params.challengeId;
        console.log(`Context params: Network - ${network}, Wizard ID: ${wizardId}, Challenge ID: ${challengeId}`);

        // Todo: fetch this based on the owner of the wizard. For now this is hard coded
        console.log('registrationToken', registrationToken);

        const document = change.after.exists ? change.after.data() : null;
        const oldDocument = change.before.data();

        // promise returned from the function
        let processor = null;

        // An undefined document means the challenge has been revoked
        // An undefined oldDocument means that the challenge is new
        // Anything else is an update to an existing challenge on one or more sides
        if (!document) {
            console.log('Challenge revoked');
            processor = notifyChallengedWizard(
                oldDocument,
                notifyChallengeRevoked,
                registrationToken,
                wizardId,
                network
            );
        } else if(!oldDocument) {
            console.log('New challenge received');
            processor = notifyChallengedWizard(
                document,
                notifyNewChallengeReceived,
                registrationToken,
                wizardId,
                network
            );
        } else {
            console.log('Challenge updated');
            processor = notifyChallengedWizard(
                oldDocument,
                notifyChallengeUpdated,
                registrationToken,
                wizardId,
                network
            );
        }

        console.log('**End of challenge notifier**');
        return processor;
    });
