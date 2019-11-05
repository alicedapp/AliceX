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

    async upsertOnlineWizards(network, {owner, wizard}) {
        // TODO

        // [
        //     {
        //         affinity: 3,
        //         ascending: false,
        //         ascensionOpponent: 0,
        //         challengeId: '_msdn0nypv',
        //         currentDuel: '0x0000000000000000000000000000000000000000000000000000000000000000',
        //         id: '6217',
        //         maxPower: 125038910370365,
        //         molded: false,
        //         nonce: 0,
        //         owner: '0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB',
        //         power: 125038910370365,
        //         online: true,
        //         ready: true
        //     },
        //     {
        //         affinity: 3,
        //         ascending: false,
        //         ascensionOpponent: 0,
        //         challengeId: '_u29pitefp',
        //         currentDuel: '0x0000000000000000000000000000000000000000000000000000000000000000',
        //         id: '294',
        //         imageUrl: 'https://storage.googleapis.com/cheeze-wizards-production/original/0x2f4bdafb22bd92aa7b7552d270376de8edccbc1e/294.png',
        //         maxPower: 333000000000000,
        //         molded: false,
        //         nonce: 0,
        //         owner: '0xB45B74aDE7973AD25eC91F64c64aEC07d26F386C',
        //         power: 333000000000000,
        //         ready: true
        //     },
        //     {
        //         affinity: 4,
        //         ascending: false,
        //         ascensionOpponent: 0,
        //         challengeId: '_dpk7ubti6',
        //         currentDuel: '0x0000000000000000000000000000000000000000000000000000000000000000',
        //         id: '6208',
        //         maxPower: 124390815712288,
        //         molded: false,
        //         nonce: 0,
        //         owner: '0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB',
        //         power: 124390815712288,
        //         ready: true
        //     },
        //     {
        //         affinity: 4,
        //         ascending: false,
        //         ascensionOpponent: 0,
        //         challengeId: '_k6seb02vd',
        //         currentDuel: '0x0000000000000000000000000000000000000000000000000000000000000000',
        //         id: '293',
        //         imageUrl: 'https://storage.googleapis.com/cheeze-wizards-production/original/0x2f4bdafb22bd92aa7b7552d270376de8edccbc1e/293.png',
        //         maxPower: 722572203976006,
        //         molded: false,
        //         nonce: 5,
        //         owner: '0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB',
        //         power: 441023073715824,
        //         ready: true
        //     }]
    }

    async upsertOfflineWizards(network, {owner, wizard}) {

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
