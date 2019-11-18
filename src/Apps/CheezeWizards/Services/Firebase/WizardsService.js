import alchemyApiService from "../../Utils/AlchemyApiService";
import cheeseWizardsContractService from "../../Utils/CheeseWizardsContractService";
import { Wallet } from "../../../../AliceSDK/Web3";

export default new class WizardsService {

  async getMyWizards() {
    const currentNetwork = await Wallet.getNetwork();
    const walletAddress = await Wallet.getAddress();
    console.log(`getWizardsForOwner for ${walletAddress} on network ${currentNetwork.name}`);

    return WizardsService._providerForNetwork(currentNetwork.name).getWizardsForOwner(currentNetwork.name, walletAddress);
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
