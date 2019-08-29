/*
 * This is the Apps Registrar for Alice
 * Register your app by:
 * 1. Creating a folder in the src/Apps directory which contains your React Native app
 * 2. Exporting your app in the Apps Export Section
 * 3. Adding your app to the list of apps in the Apps Registry Section containing the appName, backgroundColor of icon, the homeRoute, and image icon
*/

/*        Apps Export Section          */
/*        This is your Main Route Name          */
export { default as CheezeWizards } from './CheezeWizards';
export { default as Fork } from './Fork';
export { default as Foam } from './Foam';
export { default as Test } from './Example';
export { default as Mintbase } from './Mintbase';
export { default as DAOstack } from './DAOstack';
export { default as BridgeWater } from './BridgeWater';
export { default as E2E } from './E2E';
export { default as LocalEthereum } from './LocalEthereum';
export { default as CryptoHub } from './CryptoHub';


/*      App Registry Section            */
export const AppRegistry = [
  // // Your ExampleMaps ( uncomment the code below this line & delete this entire line of code )
  // {
  //   appName: 'Your App\'s Name',
  //   // can be either written or a hexadecimal or rgba
  //   backgroundColor: '#8e00ff' || 'blue' || 'rgba(0,0,0,0.5)',
  //   homeRoute: 'YourAppRoute',
  //   // your apps icon has to contain the require function to be rendered -> require('../Assets/your_app_logo.png')
  //   icon: require('../Assets/your_app_logo.png')
  // },
  // {
  //   appName: 'Fork',
  //   backgroundColor: '#8e00ff',
  //   homeRoute: 'Fork',
  //   icon: require('../AliceAssets/fork-logo.png')
  // },
  {
    appName: '#BUIDL',
    backgroundColor: '#ffffff',
    homeRoute: 'Test',
    icon: require('./Example/Assets/buidler.png')
  },
  {
    appName: 'DAOstack',
    backgroundColor: '#ffffff',
    homeRoute: 'DAOstack',
    icon: require('./DAOstack/Assets/daostack.png')
  },
  {
    appName: 'Foam',
    backgroundColor: '#ffffff',
    homeRoute: 'Foam',
    icon: require('../AliceAssets/foam.png')
  },
  {
    appName: 'E2E',
    backgroundColor: '#000',
    homeRoute: 'E2E',
    icon: require('./E2E/Assets/e2e-logo.png')
  },
  // {
  //   appName: 'VotezUp',
  //   backgroundColor: '#FFF',
  //   homeRoute: 'BridgeWater',
  //   icon: require('./BridgeWater/Assets/bridgewater.png')
  // },
  {
    appName: 'CheezeWiza..',
    backgroundColor: '#fdef5d',
    homeRoute: 'CheezeWizards',
    icon: require('./CheezeWizards/Assets/logo.png')
  },
  // {
  //   appName: 'localeth..',
  //   backgroundColor: '#dbe0ff',
  //   homeRoute: 'Map',
  //   icon: require('./LocalEthereum/Assets/localethereum.png')
  // },
  // {
  //   appName: 'CryptoHub',
  //   backgroundColor: '#ffffff',
  //   homeRoute: 'CryptoHub',
  //   icon: require('./CryptoHub/Assets/logo.png')
  // },
];
