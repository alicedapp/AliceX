/**
 * @format
 */

import AlchemyApiService from "../src/Apps/CheezeWizards/Utils/AlchemyApiService";

test("getWizardsForOwner should return wizards", async () => {
    const myAddress = "0x1AD321AFf3505169Acc72Df379ef646A6cD6a982";
    const tokenId = 3962;

    const wizards = await new AlchemyApiService().getWizardsForOwner("main", myAddress);

    console.log(wizards);

    expect(wizards.length).toBe(1);
    expect(wizards[0].owner).toBe(myAddress);
    expect(wizards[0].id).toBe(tokenId.toString());
    expect(wizards[0].imageUrl).toBeDefined();
});

test("getWizardById should return a wizard", async () => {
    const myAddress = "0x1AD321AFf3505169Acc72Df379ef646A6cD6a982";
    const tokenId = 3962;

    const wizard = await new AlchemyApiService().getWizardById("main", tokenId);

    console.log(wizard);

    expect(wizard).toBeDefined();
    expect(wizard.id).toBe(tokenId.toString());
    expect(wizard.owner).toBe(myAddress);
    expect(wizard.imageUrl).toBeDefined();
});
