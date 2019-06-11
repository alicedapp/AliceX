//
//  TransactionManager.swift
//  AliceX
//
//  Created by lmcmz on 10/6/19.
//  Copyright © 2019 lmcmz. All rights reserved.
//

import UIKit
import SPStorkController
import web3swift
import BigInt

class TransactionManager {
    static let shared = TransactionManager()
    
    class func showPaymentView() {
        let topVC = UIApplication.topViewController()
        let modal = PaymentViewController()
        let transitionDelegate = SPStorkTransitioningDelegate()
        transitionDelegate.customHeight = 500
        modal.transitioningDelegate = transitionDelegate
        modal.modalPresentationStyle = .custom
        topVC?.present(modal, animated: true, completion: nil)
    }
    
    //MARK: - Balance
    
    public func etherBalanceSync() throws -> String {
        guard let address = WalletManager.wallet?.address else { throw WalletError.accountDoesNotExist }
        guard let ethereumAddress = EthereumAddress(address) else { throw WalletError.invalidAddress }
        
        guard let balanceInWeiUnitResult = try? WalletManager.web3Net.eth.getBalance(address: ethereumAddress) else {
            throw WalletError.networkFailure
        }
        
        guard let balanceInEtherUnitStr = Web3.Utils.formatToEthereumUnits(balanceInWeiUnitResult, toUnits: Web3.Utils.Units.eth, decimals: 6, decimalSeparator: ".") else { throw WalletError.conversionFailure }
        
        return balanceInEtherUnitStr
    }
    
    public func etherBalance(completion: @escaping (String?) -> ()) {
        DispatchQueue.global().async {
            let balance = try? self.etherBalanceSync()
            DispatchQueue.main.async {
                completion(balance)
            }
        }
    }
    
    //MARK: - Send Transaction
    
    public func sendEtherSync(to address: String, amount: String, password: String) throws -> String {
        return try sendEtherSync(to: address, amount: amount, password: password, gasPrice: nil)
    }
    
    public func sendEtherSync(to address: String, amount: String, password: String, gasPrice: String?) throws -> String {
        guard let toAddress = EthereumAddress(address) else { throw WalletError.invalidAddress }
        let keystore = WalletManager.shared.keystore
        
        let etherBalance = try etherBalanceSync()
        guard let etherBalanceInDouble = Double(etherBalance) else { throw WalletError.conversionFailure }
        guard let amountInDouble = Double(amount) else { throw WalletError.conversionFailure }
        guard etherBalanceInDouble >= amountInDouble else { throw WalletError.notEnoughBalance }
        
        let keystoreManager = KeystoreManager([keystore!])
        WalletManager.web3Net.addKeystoreManager(keystoreManager)
        
        let walletAddress = EthereumAddress(WalletManager.wallet!.address)!
        let contract = WalletManager.web3Net.contract(Web3.Utils.coldWalletABI, at: toAddress, abiVersion: 2)!
        let value = Web3.Utils.parseToBigUInt(amount, units: .eth)
        var options = TransactionOptions.defaultOptions
        options.value = value
        options.from = walletAddress
        options.gasPrice = .automatic
        options.gasLimit = .automatic
        let tx = contract.write(
            "fallback",
            parameters: [AnyObject](),
            extraData: Data(),
            transactionOptions: options)!
        
        guard let sendResult = try? tx.send() else {
            throw WalletError.networkFailure
        }
        
        return sendResult.hash

    }
    
}
