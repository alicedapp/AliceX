//
//  KaychainHelper.swift
//  AliceX
//
//  Created by lmcmz on 10/6/19.
//  Copyright © 2019 lmcmz. All rights reserved.
//

import Foundation
import KeychainSwift

class KeychainHepler {
    static let keychain = KeychainSwift(keyPrefix: Setting.AliceKeychainPrefix)
    
    class func saveToKeychain(value: String, key: String) {
        keychain.set(value, forKey: key)
    }
    
    class func fetchKeychain(key: String) -> String?{
        return keychain.get(key)
    }
}
