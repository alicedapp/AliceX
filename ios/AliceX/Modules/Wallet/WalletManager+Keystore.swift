//
//  WalletManager+Keystore.swift
//  AliceX
//
//  Created by lmcmz on 10/6/19.
//  Copyright © 2019 lmcmz. All rights reserved.
//

import web3swift

extension WalletManager {
    
    func saveKeystore(_ keystore: BIP32Keystore) throws {

        guard let userDir = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first else {
            throw WalletError.invalidPath
        }
        guard let keystoreParams = keystore.keystoreParams else {
            throw WalletError.malformedKeystore
        }
        guard let keystoreData = try? JSONEncoder().encode(keystoreParams) else {
            throw WalletError.malformedKeystore
        }
        if !FileManager.default.fileExists(atPath: userDir + Setting.KeystoreDirectoryName) {
            do {
                try FileManager.default.createDirectory(atPath: userDir + Setting.KeystoreDirectoryName, withIntermediateDirectories: true, attributes: nil)
            } catch {
                throw WalletError.invalidPath
            }
        }
        
        FileManager.default.createFile(atPath: userDir + Setting.KeystoreDirectoryName + Setting.KeystoreFileName, contents: keystoreData, attributes: nil)
        
    }
    
    func loadKeystore() throws -> BIP32Keystore {
        if let keystore = keystore {
            return keystore
        }
        
        guard let userDir = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first else {
            throw WalletError.invalidPath
        }
        guard let keystoreManager = KeystoreManager.managerForPath(userDir + Setting.KeystoreDirectoryName, scanForHDwallets: true) else {
            throw WalletError.malformedKeystore
        }
        guard let address = keystoreManager.addresses?.first else {
            throw WalletError.malformedKeystore
        }
        guard let keystore = keystoreManager.walletForAddress(address) as? BIP32Keystore else {
            throw WalletError.malformedKeystore
        }
        
        return keystore
    }
    
    public func killKeystore() throws {
        
        guard let userDir = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first else {
            throw WalletError.invalidPath
        }
        
        if  (keystore != nil) {
            
            if FileManager.default.fileExists(atPath: userDir + Setting.KeystoreDirectoryName) {
                do {
                    try FileManager.default.removeItem(atPath: userDir + Setting.KeystoreDirectoryName + Setting.KeystoreFileName)
                    keystore = nil
                } catch {
                    print(error.localizedDescription)
                }
            }
        }
        
    }
}
