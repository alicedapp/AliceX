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
export { default as Foam } from './Foam';
export { default as Test } from './Example';
export { default as DAOstack } from './DAOstack';


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
  //   icon: require('../Assets/fork-logo.png')
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
    icon: require('../AliceCore/Assets/foam.png')
  },
  {
    appName: 'CheezeWiza..',
    backgroundColor: '#fdef5d',
    homeRoute: 'CheezeWizards',
    icon: require('./CheezeWizards/Assets/logo.png')
  },
  {
    appName: 'Pool Toget..',
    backgroundColor: '#2A1261',
    browserRoute: 'https://pooltogether.us',
    icon: require('./PoolTogether/Assets/logo.png')
  },
  {
    appName: 'Crypto Twitter',
    backgroundColor: '#F2F2F4',
    browserRoute: 'https://twitter.com',
    icon: require('./CryptoTwitter/Assets/crypto-twitter.png')
  },
];
