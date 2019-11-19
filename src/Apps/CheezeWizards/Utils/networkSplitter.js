export const getAlchemyApiForNetwork = (network) => {
    switch (network.toLowerCase()) {
        case 'rinkeby': {
            return `https://cheezewizards-rinkeby.alchemyapi.io`;
        }
        case 'main': {
            return `https://cheezewizards-mainnet.alchemyapi.io`;
        }
    }
};

export const getOpenSeaApiForNetwork = (network) => {
    switch (network.toLowerCase()) {
        case 'rinkeby': {
            return `https://rinkeby-api.opensea.io/api/v1`;
        }
        case 'main': {
            return `https://api.opensea.io/api/v1`;
        }
    }
};

export const getCheeseWizardsImageUrlForNetwork = (network, tokenId) => {
    switch (network.toLowerCase()) {
        case 'rinkeby': {
            return `https://storage.googleapis.com/cheeze-wizards-staging/0x0c5cf744d1284a0be2dd7a85d554173a1ed37041/${tokenId}.png`;
        }
        case 'main': {
            // TODO - URL image taken from cheese wizards site, is this correct?

            return `https://storage.googleapis.com/cheeze-wizards-production/original/0x2f4bdafb22bd92aa7b7552d270376de8edccbc1e/${tokenId}.png`;
        }
    }
};

export const checkValidNetwork = network => {
    switch (network.toLowerCase()) {
        case 'rinkeby':
        case 'main':
            return network.toLowerCase();
        default:
            throw new Error(`Not a valid network ${network}`);
    }
};
