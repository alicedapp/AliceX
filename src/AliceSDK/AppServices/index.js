import AliceSDK from '../index';
const { Wallet, Accounts } = AliceSDK;

export class AppServices {
    constructor() {
        this.initWeb3Context();
        this.initNotificationsOnAccount();
    }

    async initWeb3Context() {
        this.web3Context = {
            network: await Wallet.getNetwork(),
            address: await Wallet.getAddress()
        };
    }

    initNotificationsOnAccount() {
        const { account } = this.web3Context;

        // Todo: fetch firebase messaging token. For now, it's hardcoded
        const firebaseMessagingToken = '4532';

        Accounts.upsertFirebaseMessagingTokenForAccount(account, firebaseMessagingToken);
    }
}

export function initializeAppServices() {
    return new AppServices();
}