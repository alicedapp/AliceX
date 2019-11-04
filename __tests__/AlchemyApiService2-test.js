/**
 * @format
 */

import getWizardsForOwner from "../src/Apps/CheezeWizards/Utils/AlchemyApiService2";

test("getWizardsForOwner test", async () => {
    const myAddress = "0x1AD321AFf3505169Acc72Df379ef646A6cD6a982";

    const wizards = await getWizardsForOwner("main", myAddress);
    expect(wizards.length).toBe(1);
    expect(wizards[0].owner).toBe(myAddress);
    expect(wizards[0].imageUrl).toBeDefined();
});

