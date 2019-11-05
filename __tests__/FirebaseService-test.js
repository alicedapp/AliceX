/**
 * @format
 */

import firebaseService from "../src/Apps/CheezeWizards/Services/FirebaseService";

test.only("allUsers should return all registered users", async () => {

    const users = await firebaseService.allUsers();

    console.log('USERS >>>', users);

    expect(users.length).toBeGreaterThan(0);
});


