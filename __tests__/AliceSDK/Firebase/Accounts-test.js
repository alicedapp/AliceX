import accountsService from '../../../src/AliceSDK/Firebase/Accounts';

import accounts from './data/accounts.data';

describe('Pushing to firebase', () => {
    test('Can push a new account and retrieve', async () => {
        const account = accounts[0];
        await accountsService.upsertAccount(account);
        const accountDocument = await accountsService.getAccount(account.address);
        expect(accountDocument).toBeDefined();
        expect(accountDocument.address).toBe(account.address);
    });
});

describe('Firebase messaging token', () => {
    test('Can upsert a token', async () => {
        // Ensure there is data
        const account = accounts[0];
        await accountsService.upsertAccount(account);

        // Upsert a new token
        const newFirebaseMessagingToken = '1234';
        await accountsService.upsertFirebaseMessagingTokenForAccount(account.address, newFirebaseMessagingToken);

        const retrievedToken = await accountsService.getFirebaseMessagingTokenForAccount(account.address);
        expect(retrievedToken).toBe(newFirebaseMessagingToken);
    });
});
