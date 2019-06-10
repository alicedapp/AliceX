//
//  TransactionManager.swift
//  AliceX
//
//  Created by lmcmz on 10/6/19.
//  Copyright © 2019 lmcmz. All rights reserved.
//

import UIKit
import SPStorkController

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
}
