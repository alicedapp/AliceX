//
//  WalletError.swift
//  AliceX
//
//  Created by lmcmz on 10/6/19.
//  Copyright © 2019 lmcmz. All rights reserved.
//

public enum WalletError: Error {
    case hasAccount
    case accountDoesNotExist
    case invalidPath
    case invalidKey
    case invalidAddress
    case malformedKeystore
    case networkFailure
    case conversionFailure
    case notEnoughBalance
    case contractFailure
}

public enum ContractError: Error {
    case invalidABI
    case invalidMethodParams
    case invalidAddress
    case malformedKeystore
    case networkFailure
    case contractFailure
}
