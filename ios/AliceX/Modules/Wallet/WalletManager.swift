//
//  WalletManager.swift
//  AliceX
//
//  Created by lmcmz on 7/6/19.
//  Copyright © 2019 lmcmz. All rights reserved.
//

import Foundation
import web3swift

class WalletManager {
    
    static let shared = WalletManager()
    static var wallet: Wallet?
    
    #if DEBUG
    static var web3Net = Web3.InfuraRopstenWeb3()
    #else
    static var web3Net = Web3.InfuraMainnetWeb3()
    #endif
    
    var keystore:BIP32Keystore?
    
    class func hasWallet() -> Bool {
        guard let _ = WalletManager.wallet else {
            return false
        }
        return true
    }
    
    class func loadFromCache() {
        guard let keystore = try? WalletManager.shared.loadKeystore() else {
            return
        }
        WalletManager.shared.keystore = keystore
        let name = Setting.WalletName
        let keyData = try! JSONEncoder().encode(keystore.keystoreParams)
        let address = keystore.addresses!.first!.address
        let wallet = Wallet(address: address, data: keyData, name: name, isHD: true)
        WalletManager.wallet = wallet
    }
    
    class func createAccount(completion: VoidBlock?) {
        
        if WalletManager.hasWallet() {
            return
        }
        
        let bitsOfEntropy: Int = 128 // Entropy is a measure of password strength. Usually used 128 or 256 bits.
        let mnemonics = try! BIP39.generateMnemonics(bitsOfEntropy: bitsOfEntropy)!
        
        KeychainHepler.saveToKeychain(value: mnemonics, key: Setting.MnemonicsKey)
        
        let keystore = try! BIP32Keystore(mnemonics: mnemonics)
        let name = Setting.WalletName
        let keyData = try! JSONEncoder().encode(keystore!.keystoreParams)
        let address = keystore!.addresses!.first!.address
        let wallet = Wallet(address: address, data: keyData, name: name, isHD: true)
        
        WalletManager.wallet = wallet
        WalletManager.shared.keystore = keystore
        try! WalletManager.shared.saveKeystore(keystore!)
        
        guard let completion = completion else { return }
        completion!()
    }
    
    class func importAccount(mnemonics: String, completion: VoidBlock?) throws {
        
        if WalletManager.hasWallet() {
            throw WalletError.hasAccount
        }
        
        guard let keystore = try? BIP32Keystore(mnemonics: mnemonics) else {
            // TODO: ENSURE
            throw WalletError.malformedKeystore
        }
        
        KeychainHepler.saveToKeychain(value: mnemonics, key: Setting.MnemonicsKey)
        
        let name = Setting.WalletName
        let keyData = try! JSONEncoder().encode(keystore.keystoreParams)
        let address = keystore.addresses!.first!.address
        let wallet = Wallet(address: address, data: keyData, name: name, isHD: true)
        
        WalletManager.wallet = wallet
        WalletManager.shared.keystore = keystore
        try WalletManager.shared.saveKeystore(keystore)
        
        guard let completion = completion else { return }
        completion!()
    }
}
