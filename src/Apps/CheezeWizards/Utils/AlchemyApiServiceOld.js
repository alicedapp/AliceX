import {
    getAlchemyApiForNetwork,
    getCheeseWizardsImageUrlForNetwork
} from './networkSplitter';

import env from '../../../../env';

export default new class AlchemyApiService {

    getWizardsForOwner(network, owner) {
        return new Promise(resolve => {

            const xhr = new XMLHttpRequest();

            const onData = async (data) => {
                resolve(data.wizards.map((wizard) => this._buildWizardData(network, wizard)));
            };

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    console.log("this.responseText", this.responseText);
                    onData(JSON.parse(this.responseText));
                }
            });

            xhr.open('GET', `${getAlchemyApiForNetwork(network)}/wizards?owner=${owner}`);
            xhr.setRequestHeader('x-api-token', env.alchemy);
            xhr.setRequestHeader('x-email', env.alchemy_email);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send();
        });
    }

    getWizardById(network, tokenId) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            const onData = async (data) => {
                resolve(this._buildWizardData(network, data));
            };

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    onData(JSON.parse(this.responseText));
                }
            });

            xhr.open('GET', `${getAlchemyApiForNetwork(network)}/wizards/${tokenId}`);
            xhr.setRequestHeader('x-api-token', env.alchemy);
            xhr.setRequestHeader('x-email', env.alchemy_email);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send();
        });
    }

    getDualById(network, dualId) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();
            const onData = async (data) => {
                resolve({
                    ...data,
                    wizard1: {
                        ...await this.getWizardById(network, data.wizard1Id)
                    },
                    wizard2: {
                        ...await this.getWizardById(network, data.wizard2Id)
                    }
                });
            };
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    onData(JSON.parse(this.responseText));
                }
            });

            xhr.open('GET', `${getAlchemyApiForNetwork(network)}/dual/${dualId}`);
            xhr.setRequestHeader('x-api-token', env.alchemy);
            xhr.setRequestHeader('x-email', env.alchemy_email);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send();
        });
    }

    _buildWizardData(network, data) {
        return {
            ...data,
            imageUrl: getCheeseWizardsImageUrlForNetwork(network, data.id)
        };
    }

};
