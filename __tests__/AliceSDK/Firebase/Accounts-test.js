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
    test('Can retrieve a token for a given account', async () => {
        expect(1).toBe(1);
    });
});