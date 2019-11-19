import AliceSDK from '../index';
const { Wallet, Accounts } = AliceSDK;

export class AppServices {
    async initializeAppServices() {
        await this.initWeb3Context();
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

export async function initializeAppServices() {
    const AppServices = new AppServices();
    await AppServices.initializeAppServices();
    return AppServices;
}