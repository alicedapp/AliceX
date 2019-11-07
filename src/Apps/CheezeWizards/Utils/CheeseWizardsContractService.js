import {
    getOpenSeaApiForNetwork,
    getCheeseWizardsImageUrlForNetwork
} from './networkSplitter';

import ABIs from '../ABIs';
import Addresses, {WizardGuild} from '../Addresses';
import env from '../../../../env';
import {Contract, Wallet} from '../../../AliceSDK/Web3';
import {getSalt, switchcase} from './index';
import {ethers} from 'ethers';

export default new class CheeseWizardsContractService {

    getWizardsForOwner(network, owner) {
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
                ? WizardGuild.rinkeby
                : WizardGuild.mainnet;

            xhr.open('GET', `${getOpenSeaApiForNetwork(network)}/assets?owner=${owner}&asset_contract_addresses=${contractAddress}`);
            xhr.setRequestHeader('x-api-key', env.opensea);
            xhr.send();
        });
    }

    async getWizardById(network, tokenId) {
        try {
          const contractAddress = network.toLowerCase() === 'rinkeby'
            ? Addresses.BasicTournament.rinkeby
            : Addresses.BasicTournament.mainnet;

          const ABI = network.toLowerCase() === 'rinkeby'
            ? Addresses.BasicTournament.rinkeby
            : Addresses.WizardGuild.mainnet;

          console.log(`Get wizard [${tokenId}] on network [${network}] and address [${contractAddress}]`);

          const wizard = await Contract.read({
            contractAddress: contractAddress,
            abi: ABIs.BasicTournament,
            functionName: 'getWizard',
            parameters: [tokenId],
            network: network.toLowerCase(),
          });

          Object.keys(wizard).forEach(function (key) {
            if (typeof wizard[key] === 'object') {
              wizard[key] = parseInt(wizard[key]._hex);
            }
            wizard.id = tokenId;
          });

          return this._buildWizardData(network, wizard);

        } catch(e) {
            console.log('getWizard error',e);
        }
    }

    async getWizardCosts(network) {

        const contractAddress = network.toLowerCase() === 'rinkeby'
            ? Addresses.GateKeeper.rinkeby
            : Addresses.GateKeeper.mainnet;

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
            : Addresses.ThreeAffinityDuelResolver.mainnet;

        const isValid = await Contract.read({
            contractAddress: contractAddress,
            abi: ABIs.ThreeAffinityDuelResolver,
            functionName: 'isValidMoveSet',
            parameters: [moveSet],
            network: network.toLowerCase()
        });

        console.log(`Commitment Hash [${commitmentHash}] isValid [${isValid}]`);

        return {
            salt,
            moveSet,
            commitmentHash,
            isValid
        };
    }

    async oneSidedCommit(network, {wizard, challengedWizard, commitmentHash}) {

        const contractAddress = network.toLowerCase() === 'rinkeby'
            ? Addresses.BasicTournament.rinkeby
            : Addresses.BasicTournament.mainnet;

        const txHash = await Contract.write({
            contractAddress: contractAddress,
            abi: ABIs.BasicTournament,
            functionName: 'oneSidedCommit',
            parameters: [parseInt(wizard.id), parseInt(challengedWizard.id), commitmentHash],
            value: '0',
            data: '0x0'
        });

        console.log(`One sided commit - wizard [${wizard.id}] challenger [${challengedWizard.id}] and commitmentHash [${commitmentHash}] for network [${network}]`);

        return txHash;
    }

    async conjureWizard(network, {affinity, value}) {

        const contractAddress = network.toLowerCase() === 'rinkeby'
            ? Addresses.GateKeeper.rinkeby
            : Addresses.GateKeeper.mainnet;

        console.log(`Conjure wizard  - affinity [${affinity}] value [${value}]`);
        const txHash = await Contract.write({
            contractAddress: contractAddress,
            abi: ABIs.GateKeeper,
            functionName: 'conjureWizard',
            parameters: [affinity],
            value: value + 0.0001,
            data: '0x0'
        });


        return txHash;
    }

    _buildWizardData(network, data) {
        return {
            ...data,

            imageUrl: getCheeseWizardsImageUrlForNetwork(network, data.id)
        };
    }

};
