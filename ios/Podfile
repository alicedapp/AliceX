platform :ios, '10.0'
inhibit_all_warnings!
source 'https://github.com/CocoaPods/Specs.git'

target 'AliceX' do
  use_frameworks!
  
  pod 'web3.swift.pod', '~> 2.2.0'
  pod 'KeychainSwift', '~> 16.0'
  pod 'SPStorkController'

  # React Native Dependencies
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'Core',
  'CxxBridge',
  'DevSupport',
  'RCTText',
  'RCTAnimation',
  'RCTImage',
  'RCTActionSheet',
  'RCTNetwork',
  'RCTWebSocket',
  'RCTLinkingIOS'
  ]
  
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
  pod 'RNGestureHandler', :path => '../node_modules/react-native-gesture-handler'
  pod 'react-native-camera', path: '../node_modules/react-native-camera'
  pod 'react-native-mapbox-gl', :path => '../node_modules/@mapbox/react-native-mapbox-gl'

end
