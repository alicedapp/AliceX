import {db} from '../../../../../AliceSDK/Firebase';

import {checkValidNetwork} from '../../../Utils/networkSplitter';

export default new class FirebaseService {

    async getAllUsers() {
        return db
            .collection("users")
            .get()
            .then((snapshots) => {
                if (snapshots.empty) {
                    return [];
                }
                const users = [];
                snapshots.docs.forEach((doc) => {
                    users.push(doc.data());
                });
                return users;
            });

    }

    async getAllWizards(network) {

        checkValidNetwork(network);

        return db
            .collection('wizards')
            .doc('network')
            .collection(network)
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    return [];
                }
                const wizards = [];
                snapshots.docs.forEach(doc => {
                    wizards.push(doc.data());
                });
                return wizards;
            });
    }

    // Todo: should return an empty array if network is not defined or not a valid string + associated test
    async getOnlineWizards(network) {

        checkValidNetwork(network);

        return db
            .collection('wizards')
            .doc('network')
            .collection(network)
            .where('online', '==', true)
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    return [];
                }
                const wizards = [];
                snapshots.docs.forEach(doc => {
                    wizards.push(doc.data());
                });
                return wizards;
            });
    }

    // Todo: should return an empty array if network is not defined or not a valid string + associated test
    // Todo: should return an empty array if owner is not defined or not a valid address + associated test
    async getWizardsByOwner(network, owner) {

        checkValidNetwork(network);

        return db
            .collection('wizards')
            .doc('network')
            .collection(network)
            .where('owner', '==', owner)
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    return [];
                }
                const wizards = [];
                snapshots.docs.forEach(doc => {
                    wizards.push(doc.data());
                });
                return wizards;
            });
    }

    async getChallengesByWizard(network, wizardId) {

        checkValidNetwork(network);

        return db
            .collection('wizards')
            .doc('network')
            .collection(network)
            .doc(wizardId)
            .collection('duel')
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    return [];
                }
                const challenges = [];
                snapshots.docs.forEach(doc => {
                    challenges.push({challengeId: doc.id, ...doc.data()});
                });
                return challenges;
            });
    }

    // Todo: should handle network not being defined or invalid + associated test
    // Todo: should handle wizards being undefined / not an array as the map will fail + associated test
    // Todo: should guard against wizard.id being undefined + associated test
    async upsertWizards(network, wizards) {

        checkValidNetwork(network);

        return Promise.all(wizards.map((wizard) => {
            // /wizards/network/{networkID}/{wizardID}/
            return db
                .collection('wizards')
                .doc('network')
                .collection(network)
                .doc(wizard.id)
                .set(wizard, {
                    merge: true
                });
        }));
    }

    // Todo: should handle network not being defined or invalid + associated test
    // Todo: should check params passed in valid + associated test
    // Todo: do we need to do ownership check that we're challenging someone else's wizard?
    async sendChallenge(network, {challengeId, challengingWizardId, otherWizardId}) {

        checkValidNetwork(network);

        // challenger data
        const challengerData = {
            currentDuel: '0x0000000000000000000000000000000000000000000000000000000000000000',
            otherWizardId,
            challengeAccepted: false,
            challenger: true,
        };

        // challengee data
        const challengeeData = {
            currentDuel: '0x0000000000000000000000000000000000000000000000000000000000000000',
            challengingWizardId,
            commitmentHash: '',
            challengeAccepted: false,
            challenger: false,
        };

        const networkRef = db.collection('wizards').doc('network').collection(network);
        const challengerDataRef = networkRef.doc(challengingWizardId).collection('duel').doc(challengeId);
        const challengeeDataRef = networkRef.doc(otherWizardId).collection('duel').doc(challengeId);

        await db.runTransaction(t => {
            t.set(challengerDataRef, challengerData);
            t.set(challengeeDataRef, challengeeData);
            return Promise.resolve('done');
        });
    }

    async acceptChallenge(network, {wizardId, challengeId, commitmentHash, currentDuel}) {

        checkValidNetwork(network);

        const networkRef = db.collection('wizards').doc('network').collection(network);
        const challengeRef = networkRef
            .doc(wizardId)
            .collection('duel')
            .doc(challengeId);

        await db.runTransaction(t => {
           return t.get(challengeRef).then(doc => {
               const challenge = doc.data();
               const challengerRef = networkRef.doc(challenge.challengingWizardId).collection('duel').doc(challengeId);
               return t.get(challengerRef).then(() => {
                   t.update(challengeRef, {
                       challengeAccepted: true,
                       commitmentHash,
                       currentDuel
                   });

                   t.update(challengerRef, {challengeAccepted: true});
               });
           });
        });
    }

    async allOutstandingChallenges(network, owner) {
        // TODO I need this in the stage
    }

    async registerFirebaseMessagingTokenForEthAddress() {

    }

    // async registerWizardForDueling(network, {owner, wizard}) {
    //     return this._duelCollection(owner, wizard)
    //         .set({
    //             ...wizard,
    //             dueling: false
    //         });
    // }
    //
    // async acceptDuel(network, {owner, wizard}, {opponent, opponentWizard}) {
    //
    //     await this._duelCollection(owner, wizard)
    //         .set({
    //             ...wizard,
    //             dueling: true,
    //             opponentAddress: opponent,
    //             opponentWizardId: opponentWizard.id
    //         });
    //
    //     await this._duelCollection(opponent, opponentWizard)
    //         .set({
    //             ...opponentWizard,
    //             dueling: true,
    //             opponentAddress: owner,
    //             opponentWizardId: wizard.id
    //         });
    // }
    //
    //
    // async getWizardsAwaitingDuels(network) {
    //
    // }
    //
    // async getRegisteredWizards(network) {
    //
    // }
    //
    // _duelCollection(network, owner, wizard) {
    //     // /data/{networkId}/duels/{owner_address}/wizards/{wizard_id}/{WIZARD_DATA}
    //     return db
    //         .collection("data")
    //         .doc(network)
    //         .collection("registered-matches")
    //         .add({
    //             ...wizard,
    //             wizardId: wizard.id,
    //             dueling: true,
    //             owner: owner
    //         })
    //         .doc(owner)
    //         .collection("wizards")
    //         .doc(wizard.id);
    // }
};
