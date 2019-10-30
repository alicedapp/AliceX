import {
    getOpenSeaApiForNetwork,
    getCheeseWizardsImageUrlForNetwork
} from './networkSplitter';

import ABIs from '../ABIs';
import Addresses from '../Addresses';
import env from '../../../../env';
import {Contract} from '../../../AliceSDK/Web3';

export default new class CheeseWizardsContractService {

    getWizardsForOwner(network, owner) {
        // TODO switch to call alchemy APi once we know what rinkeby doesnt work ....

        return new Promise(resolve => {

            const xhr = new XMLHttpRequest();

            const onData = async (data) => {
                const wizards = await Promise.all(data.assets.map(async wizard => {
                    return this.getWizardById(network, wizard.token_id);
                }));
                resolve(wizards);
            };

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    if (this.responseText) {
                        onData(JSON.parse(this.responseText));
                    }
                }
            });

            const contractAddress = network.toLowerCase() === 'rinkeby'
                ? '0x51b08285adbd35225444b56c1888c49a6bb2f664' // FIXME what is this address?
                : Addresses.BasicTournament.mainnet;

            xhr.open('GET', `${getOpenSeaApiForNetwork(network)}/assets?owner=${owner}&asset_contract_addresses=${contractAddress}`);
            xhr.setRequestHeader('x-api-key', env.opensea);
            xhr.send();
        });
    }

    getWizardById(network, tokenId) {
        return new Promise(async resolve => {

            let contractAddress = network.toLowerCase() === 'rinkeby'
                ? Addresses.BasicTournament.rinkeby
                : Addresses.BasicTournament.main;

            console.log(`Get wizard [${tokenId}] on network [${network}] and address [${contractAddress}]`);

            const wizard = await Contract.read({
                contractAddress: contractAddress,
                abi: ABIs.BasicTournament,
                functionName: 'getWizard',
                parameters: [tokenId],
                network: network.toLowerCase()
            });

            Object.keys(wizard).forEach(function (key) {
                if (typeof wizard[key] === 'object') {
                    wizard[key] = parseInt(wizard[key]._hex);
                }
                wizard.id = tokenId;
            });

            resolve(this._buildWizardData(network, wizard));
        });
    }

    _buildWizardData(network, data) {
        console.log('data', data);
        return {
            ...data,
            imageUrl: getCheeseWizardsImageUrlForNetwork(network, data.id)
        };
    }

};
