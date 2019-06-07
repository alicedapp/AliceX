//
//  WalletManager.swift
//  AliceX
//
//  Created by lmcmz on 7/6/19.
//  Copyright © 2019 lmcmz. All rights reserved.
//

import Foundation
import web3swift
import KeychainSwift

struct Wallet {
    let address: String
    let data: Data
    let name: String
    let isHD: Bool
}

struct HDKey {
    let name: String?
    let address: String
}

class WalletManager {
    
    class func createAccount() {
        
        let bitsOfEntropy: Int = 128 // Entropy is a measure of password strength. Usually used 128 or 256 bits.
        let mnemonics = try! BIP39.generateMnemonics(bitsOfEntropy: bitsOfEntropy)!
        
        let keychain = KeychainSwift(keyPrefix: "Alice")
        keychain.set(mnemonics, forKey: "mnemonics")
        
        let keystore = try! BIP32Keystore(mnemonics: mnemonics)
        //        BIP32Keystore(mnemonics: mnemonics)
        let name = "New HD Wallet"
        let keyData = try! JSONEncoder().encode(keystore!.keystoreParams)
        let address = keystore!.addresses!.first!.address
        let wallet = Wallet(address: address, data: keyData, name: name, isHD: true)
    }
}
