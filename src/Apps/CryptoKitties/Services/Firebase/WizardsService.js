import alchemyApiService from "../../Utils/AlchemyApiService";
import CheeseWizardsContractService from "../../Utils/CheeseWizardsContractService";
import { Wallet } from "../../../../AliceSDK/Web3";

export default new class WizardsService {

  async getMyWizards(network, address) {
    // todo: remove the next 2 lines as this will instead be handled by AppServices
    //const currentNetwork = await Wallet.getNetwork();
    //const walletAddress = await Wallet.getAddress();
    console.log(`getWizardsForOwner for ${address} on network ${network.name}`);

    return await CheeseWizardsContractService.getWizardsForOwner(network.name, address);
  }

  static _providerForNetwork(network) {
    switch (network.toLowerCase()) {
      case 'rinkeby': {
        return cheeseWizardsContractService;
      }
      case 'main': {
        return cheeseWizardsContractService;
      }
    }
  }
};
