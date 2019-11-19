const notificationService = require('./notification-service');
const firestoreService = require('./firestore-service');

module.exports = new class WizardNotificationService {
    notifyChallengeRevoked(document, registrationToken, wizardId, network) {
        const {challengingWizardId} = document;
        const title = 'Duel Challenge Revoked!';
        const body = `[[${network}]] Your wizard (${wizardId}) is no longer challenged to a duel by (${challengingWizardId})`;
        const data = {
            wizardId,
            challengingWizardId
        };
        return notificationService.sendNotification(registrationToken, title, body, data);
    }

    notifyNewChallengeReceived(document, registrationToken, wizardId, network) {
        const {challengingWizardId} = document;
        const title = 'New Duel Challenge!';
        const body = `[[${network}]] Your wizard (${wizardId}) has been challenged to a duel by (${challengingWizardId})`;
        const data = {
            wizardId,
            challengingWizardId
        };
        return notificationService.sendNotification(registrationToken, title, body, data);
    }

    notifyChallengeUpdated(document, registrationToken, wizardId, network) {
        const {challengingWizardId} = document;
        const title = 'Duel Challenge Updated';
        const body = `[[${network}]] There has been an update to your wizard's challenge (${wizardId})`;
        const data = {
            wizardId,
            challengingWizardId
        };
        return notificationService.sendNotification(registrationToken, title, body, data);
    }

    async notifyChallengedWizard(document, notifyFn, wizardId, network) {
        console.log('Asserting not challenger...');
        let processor = Promise.resolve('done');
        if (!document.challenger) {
            console.log('Proceeding as not the challenging wizard');

            // Get the device messaging token (firebase messaging token)
            const wizard = await firestoreService.getWizard(network, wizardId);
            console.log('wizard', wizard);
            if (!wizard || (wizard && !wizard.owner)) {
                console.error(`Unable to retrieve wizard / owner data for wizard ID ${wizardId}. Exiting early...`);
                return null;
            }

            const registrationToken = await firestoreService.getFirebaseDeviceMessagingToken(wizard.owner);
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
};