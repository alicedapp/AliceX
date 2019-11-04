import {
  getAlchemyApiForNetwork,
  getCheeseWizardsImageUrlForNetwork
} from "./networkSplitter";

import env from "../../../../env";

import axios from "axios";

const getWizardsForOwner = async (network, owner) => {
  const res = await axios.get(
    `${getAlchemyApiForNetwork(network)}/wizards?owner=${owner}`,
    {
      headers: {
        "x-api-token": env.alchemy,
        "x-email": env.alchemy_email,
        "content-type": "application/json"
      }
    }
  );

  const _buildWizardData = (network, data) => {
    return {
      ...data,
      imageUrl: getCheeseWizardsImageUrlForNetwork(network, data.id)
    };
  };

  return res.data.wizards.map((wizard) => _buildWizardData(network, wizard));
};

export default getWizardsForOwner

