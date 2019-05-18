import React, { useState } from 'react';

export const TransactionWaitContext = React.createContext({})

const TransactionWait = (props) => {

    const [transactionWaitMessageState, setTransactionWaitMessage] = useState("")

    return (
        <TransactionWaitContext.Provider value={[transactionWaitMessageState, setTransactionWaitMessage]}>
            {props.children}
        </TransactionWaitContext.Provider>
    )
}

export default TransactionWait
