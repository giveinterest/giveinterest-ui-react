import React, {useContext} from 'react'
import {TransactionWaitContext} from "./TransactionWait"

const TransactionPendingNotice = () => {
    const [transactionWaitMessageState,]  = useContext(TransactionWaitContext)
    return (
        <div>
            {transactionWaitMessageState}<br/>
        </div>
    )
}

export default TransactionPendingNotice