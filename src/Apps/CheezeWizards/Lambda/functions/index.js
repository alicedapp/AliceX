const functions = require('firebase-functions');
const wizardNotificationService = require('./wizard-notification-service');

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
            processor = await wizardNotificationService.notifyChallengedWizard(
                oldDocument,
                wizardNotificationService.notifyChallengeRevoked,
                wizardId,
                network
            );
        } else if(!oldDocument) {
            console.log('New challenge received');
            processor = await wizardNotificationService.notifyChallengedWizard(
                document,
                wizardNotificationService.notifyNewChallengeReceived,
                wizardId,
                network
            );
        } else {
            console.log('Challenge updated');
            processor = await wizardNotificationService.notifyChallengedWizard(
                oldDocument,
                wizardNotificationService.notifyChallengeUpdated,
                wizardId,
                network
            );
        }

        console.log('**End of challenge notifier**');
        return processor;
    });
