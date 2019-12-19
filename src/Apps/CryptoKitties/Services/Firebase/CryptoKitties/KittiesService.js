// todo: change this path when imported into the CK tinder app
import {db} from '../../../../../AliceSDK/Firebase/index';

export default new class KittiesService {
    async getAllKittiesForAddress(network, address) {
        return db.collection('kitties')
            .doc('network')
            .collection(network)
            .where('owner.address', '==', address)
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    return [];
                }
                return snapshots.docs.map(doc => doc.data());
            });
    }

    async getAllSwipeRightsIncomingForKittie(network, kittieId) {
        return db.collection('kitties')
            .doc('network')
            .collection(network)
            .doc(kittieId)
            .collection('swipeRightIncoming')
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    return [];
                }
                return snapshots.docs.map(doc => doc.data());
            });
    }

    async getAllSwipeRightsOutgoingForKittie(network, kittieId) {
        return db.collection('kitties')
            .doc('network')
            .collection(network)
            .doc(kittieId)
            .collection('swipeRightOutgoing')
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    return [];
                }
                return snapshots.docs.map(doc => doc.data());
            });
    }

    async getAllKittiesWithSwipeRightsForAddress(network, address) {
        return db.collection('kitties')
            .doc('network')
            .collection(network)
            .where('owner.address', '==', address)
            .get()
            .then(snapshots => {
                if (snapshots.empty) {
                    return [];
                }
                return Promise.all(snapshots.docs
                    .map(doc => doc.data())
                    .map(async kittie => ({
                        ...kittie,
                        swipeRightsIncoming: await this.getAllSwipeRightsIncomingForKittie(network, kittie.id.toString()),
                        swipeRightsOutgoing: await this.getAllSwipeRightsOutgoingForKittie(network, kittie.id.toString()),
                    })));
            });
    }

    async upsertKitties(network, kitties) {
        //checkValidNetwork(network);

        return Promise.all(kitties.map(kittie => {
            // /kitties/network/{networkID}/{kittieId}/
            return db
                .collection('kitties')
                .doc('network')
                .collection(network)
                .doc(kittie.id.toString())
                .set(kittie, {
                    merge: true
                });
        }));
    }

    async matchKitties(network, studId, kittieId) {
        const timestamp = Math.floor(Date.now() / 1000);

        const matchData = {
            studId,
            kittieId,
            timestamp
        };

        const networkRef = db.collection('kitties').doc('network').collection(network);
        const studMatchDataRef = networkRef.doc(studId).collection('match').doc(kittieId);
        const otherMatchDataRef = networkRef.doc(kittieId).collection('match').doc(studId);

        const otherSwipeRightIncomingDataRef = networkRef.doc(kittieId).collection('swipeRightIncoming').doc(studId);
        const otherSwipeRightOutgoingDataRef = networkRef.doc(studId).collection('swipeRightOutgoing').doc(kittieId);

        await db.runTransaction(t => {
            t.set(studMatchDataRef, matchData);
            t.set(otherMatchDataRef, matchData);
            t.set(otherSwipeRightIncomingDataRef, {status: 'MATCH'}, {merge: true});
            t.set(otherSwipeRightOutgoingDataRef, {status: 'MATCH'}, {merge: true});
            return Promise.resolve('done');
        });
    }

    async poke(network, pokeId, kittieId, message, from, studId) {
        return db.collection('kitties')
            .doc('network')
            .collection(network)
            .doc(kittieId)
            .collection('poke')
            .doc(pokeId)
            .set({msg: message, from, stud: studId}, {
                merge: true
            });
    }

    async swipeRight(network, kittie, stud, msg, from) {
        console.log('PAYLOAD: ');
        console.log('NETWORK: ', network);
        console.log('KITTY: ', kittie);
        console.log('STUD: ',  stud);
        console.log('MSG: ',  msg);
        console.log('FROM: ',  from);
        const payload = {
            msg,
            from,
            kittie: {
                id: kittie.id.toString(),
                name: kittie.name,
                kittieImg: kittie.image_url_png
            },
            stud,
            status: 'PENDING'
        };

        const networkRef = db.collection('kitties').doc('network').collection(network);
        const swipedRightIncoming = networkRef
            .doc(kittie.id.toString())
            .collection('swipeRightIncoming')
            .doc(stud.id.toString());

        const swipedRightOutgoing = networkRef
            .doc(stud.id)
            .collection('swipeRightOutgoing')
            .doc(kittie.id.toString());

        await db.runTransaction(t => {
            t.set(swipedRightIncoming, payload, {merge: true});
            t.set(swipedRightOutgoing, payload, {merge: true});
            return Promise.resolve('done');
        });
    }
};
