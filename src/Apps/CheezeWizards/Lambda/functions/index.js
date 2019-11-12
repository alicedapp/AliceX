const functions = require('firebase-functions');

exports.challengeManager = functions.firestore
    .document('wizards/network/{network}/{wizardId}/duel/{challengeId}')
    .onWrite((change, context) => {
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
    });
