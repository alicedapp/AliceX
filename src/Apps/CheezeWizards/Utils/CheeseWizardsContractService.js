import {
    getOpenSeaApiForNetwork,
    getCheeseWizardsImageUrlForNetwork
} from './networkSplitter';

import ABIs from '../ABIs';
import Addresses from '../Addresses';
import env from '../../../../env';
import {Contract, Wallet} from '../../../AliceSDK/Web3';
import {getSalt, switchcase} from './index';
import {ethers} from 'ethers';

export default new class CheeseWizardsContractService {

    // TODO can we use await Wallet.getNetwork(); and not pass in the network to each method?

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

    async getWizardById(network, tokenId) {
        const contractAddress = network.toLowerCase() === 'rinkeby'
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

        return this._buildWizardData(network, wizard);
    }

    async getWizardCosts(network) {

        const contractAddress = network.toLowerCase() === 'rinkeby'
            ? Addresses.GateKeeper.rinkeby
            : Addresses.GateKeeper.main;

        console.log(`Get wizard costs on network [${network}] and address [${contractAddress}]`);

        const wizardCosts = await Contract.read({
            contractAddress: contractAddress,
            abi: ABIs.GateKeeper,
            functionName: 'wizardCosts',
            parameters: [],
            network: network.toLowerCase()
        });

        Object.keys(wizardCosts).forEach(function (key) {
            if (typeof wizardCosts[key] === 'object') {
                wizardCosts[key] = parseInt(wizardCosts[key]._hex);
            }
        });

        return wizardCosts;
    }

    async isValidMoveSet(network, rawMoves) {

        const moves = rawMoves.map((item) => switchcase({
            'fire': '02',
            'water': '03',
            'wind': '04'
        })(item.element)).join('');

        const moveSet = `0x${moves}000000000000000000000000000000000000000000000000000000`;
        const salt = getSalt();

        console.log(`Moveset [${moveSet}] salt [${salt}]`);

        const commitmentHash = ethers.utils.keccak256(moveSet + salt);

        const contractAddress = network.toLowerCase() === 'rinkeby'
            ? Addresses.ThreeAffinityDuelResolver.rinkeby
            : Addresses.ThreeAffinityDuelResolver.main;

        const isValid = await Contract.read({
            contractAddress: contractAddress,
            abi: ABIs.ThreeAffinityDuelResolver,
            functionName: 'isValidMoveSet',
            parameters: [moveSet],
            network: 'rinkeby'
        });

        console.log(`Commitment Hash [${commitmentHash}] isValid [${isValid}]`);

        return {
            salt,
            moveSet,
            commitmentHash,
            isValid
        };
    }

    _buildWizardData(network, data) {
        console.log('data', data);
        return {
            ...data,
            imageUrl: getCheeseWizardsImageUrlForNetwork(network, data.id)
        };
    }

};
