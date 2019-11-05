import db from '../../../AliceSDK/Socket/index';

export default new class FirebaseService {

    async allUsers() {
        return db
            .collection("users")
            .get()
            .then((snapshots) => {
                if (snapshots.empty) {
                    return [];
                }
                const users = [];
                snapshots.docs.forEach((doc) => {
                    // users.push(doc.id);
                    users.push(doc.data());
                });
                return users;
            });

    }

    async allWizards(network) {
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

    async upsertWizards(network, wizards) {
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

    async getOnlineWizards(network) {
        const allWizards = await this.allWizards(network);
        return allWizards.filter(wizard => wizard.online);
    }

    async getWizardsByOwner(network, owner) {

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
    // async getRegisteredWizardsForOwner(network, owner) {
    //     return db
    //         .collection("data")
    //         .doc(network)
    //         .collection("duels")
    //         .doc(owner)
    //         .collection("wizards")
    //         .get()
    //         .then((snapshots) => {
    //             if (snapshots.empty) {
    //                 return [];
    //             }
    //             const wizards = [];
    //             snapshots.docs.forEach((value) => {
    //                 wizards.push(value.data());
    //             });
    //             return wizards;
    //         });
    // }
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
