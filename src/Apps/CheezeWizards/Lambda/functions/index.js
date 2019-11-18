const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp(require('./_keys/env').firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(require('./_keys/adminsdk-keys')),
    databaseURL: 'https://alice-1555232535074.firebaseio.com'
});

const messaging = admin.messaging();
function sendNotification(registrationToken, title, body, data) {
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

const db = firebase.firestore();
async function getWizard(network, id) {
    return db
        .collection('wizards')
        .doc('network')
        .collection(network)
        .doc(id)
        .get()
        .then(snapshot => {
            if(snapshot.exists) {
                return snapshot.data();
            }
            return null;
        });
}

async function getFirebaseDeviceMessagingToken(ethAddress) {
    return db
        .collection('accounts')
        .doc(ethAddress)
        .get()
        .then(snapshot => {
            if(snapshot.exists) {
                const document = snapshot.data();
                return document.firebaseMessagingToken ? document.firebaseMessagingToken : '';
            }
            return '';
        });
}

function notifyChallengeRevoked(document, registrationToken, wizardId, network) {
    const {challengingWizardId} = document;
    const title = 'Duel Challenge Revoked!';
    const body = `[[${network}]] Your wizard (${wizardId}) is no longer challenged to a duel by (${challengingWizardId})`;
    const data = {
        wizardId,
        challengingWizardId
    };
    return sendNotification(registrationToken, title, body, data);
}

function notifyNewChallengeReceived(document, registrationToken, wizardId, network) {
    const {challengingWizardId} = document;
    const title = 'New Duel Challenge!';
    const body = `[[${network}]] Your wizard (${wizardId}) has been challenged to a duel by (${challengingWizardId})`;
    const data = {
        wizardId,
        challengingWizardId
    };
    return sendNotification(registrationToken, title, body, data);
}

function notifyChallengeUpdated(document, registrationToken, wizardId, network) {
    const {challengingWizardId} = document;
    const title = 'Duel Challenge Updated';
    const body = `[[${network}]] There has been an update to your wizard's challenge (${wizardId})`;
    const data = {
        wizardId,
        challengingWizardId
    };
    return sendNotification(registrationToken, title, body, data);
}

async function notifyChallengedWizard(document, notifyFn, wizardId, network) {
    console.log('Asserting not challenger...');
    let processor = Promise.resolve('done');
    if (!document.challenger) {
        console.log('Proceeding as not the challenging wizard');

        // Get the device messaging token (firebase messaging token)
        const wizard = await getWizard(network, wizardId);
        console.log('wizard', wizard);
        if (!wizard || (wizard && !wizard.owner)) {
            console.error(`Unable to retrieve wizard / owner data for wizard ID ${wizardId}. Exiting early...`);
            return null;
        }

        const registrationToken = await getFirebaseDeviceMessagingToken(wizard.owner);
        if (!registrationToken) {
            console.error(`Unable to retrieve a firebase messaging token for ${wizard.owner}. Exiting early...`);
            return null;
        }

        processor = notifyFn(document, registrationToken, wizardId, network);

        console.log('Notifying the owner of the challenged wizard');
    } else {
        console.log('Finishing as this is the challenging wizard');
    }
    return processor;
}

exports.challengeNotifier = functions.firestore
    .document('wizards/network/{network}/{wizardId}/duel/{challengeId}')
    .onWrite(async (change, context) => {
        console.log('**Executing challenge notifier**');

        const network = context.params.network;
        const wizardId = context.params.wizardId;
        const challengeId = context.params.challengeId;
        console.log(`Context params: Network - ${network}, Wizard ID: ${wizardId}, Challenge ID: ${challengeId}`);

        const document = change.after.exists ? change.after.data() : null;
        const oldDocument = change.before.data();

        // promise returned from the function
        let processor = null;

        // An undefined document means the challenge has been revoked
        // An undefined oldDocument means that the challenge is new
        // Anything else is an update to an existing challenge on one or more sides
        if (!document) {
            console.log('Challenge revoked');
            processor = await notifyChallengedWizard(
                oldDocument,
                notifyChallengeRevoked,
                wizardId,
                network
            );
        } else if(!oldDocument) {
            console.log('New challenge received');
            processor = await notifyChallengedWizard(
                document,
                notifyNewChallengeReceived,
                wizardId,
                network
            );
        } else {
            console.log('Challenge updated');
            processor = await notifyChallengedWizard(
                oldDocument,
                notifyChallengeUpdated,
                wizardId,
                network
            );
        }

        console.log('**End of challenge notifier**');
        return processor;
    });
