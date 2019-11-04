import {
  getAlchemyApiForNetwork,
  getCheeseWizardsImageUrlForNetwork
} from "./networkSplitter";

import env from "../../../../env";

import axios from "axios";

class AlchemyApiService {

  // FIXME how to handle non-200 status
  constructor () {
    this.headers = {
      "x-api-token": env.alchemy,
      "x-email": env.alchemy_email,
      "content-type": "application/json"
    }
  }

  async getWizardsForOwner(network, owner) {
    const res = await axios.get(`${getAlchemyApiForNetwork(network)}/wizards?owner=${owner}`, { headers: this.headers });
    return res.data.wizards.map((wizard) => this._buildWizardData(network, wizard));
  };

  async getWizardById(network, tokenId) {
    const res = await axios.get(`${getAlchemyApiForNetwork(network)}/wizards/${tokenId}`, { headers: this.headers });
    return this._buildWizardData(network, res.data);
  }

  _buildWizardData(network, data) {
    return {
      ...data,
      imageUrl: getCheeseWizardsImageUrlForNetwork(network, data.id)
    };
  }
}

export default AlchemyApiService;

