import React, { useEffect }from 'react'
import { Route, Switch } from 'react-router-dom'

import ReceiverPage from "./components/pages/ReceiverPage"
import OwnerPage from "./components/pages/OwnerPage"
import NewFundPage from "./components/pages/NewFundPage"

import CompoundFinanceState from "./state/CompoundFinanceState"
import OwnedFundAddressesState from "./state/OwnedFundAddressesState"
import TransactionWait from "./components/TransactionWait"

import { useWeb3Context } from 'web3-react'

const App  = () => {
    const context = useWeb3Context()

    useEffect(() => {
        context.setFirstValidConnector(['MetaMask'])
        // context.setFirstValidConnector(['MetaMask', 'Infura'])
    }, [])

    if (!context.active && !context.error) {
        return (<div>loading web3...</div>)
    } else if (context.error) {
        return (<div>No web3</div>)
    } else {

        // console.log(JSON.stringify(context))

        window.ethereum.enable()
        window.ethereum.on('accountsChanged', function (accounts) {
            window.location.reload();
        })
        window.ethereum.on('networkChanged', function (netId) {
            window.location.reload();
        })

        // success
        return (
            <div>
                <CompoundFinanceState><OwnedFundAddressesState>
                    <TransactionWait>
                        <Switch>
                            <Route exact path="/new" render={() => <NewFundPage /> } />
                            <Route exact path="/fund/:id" render={() => <OwnerPage fromUrl={true} /> } />
                            <Route exact path="/withdraw/:id" render={() => <ReceiverPage /> } />
                            <Route exact path="/" render={() => <OwnerPage />} />
                        </Switch>
                    </TransactionWait>
                </OwnedFundAddressesState></CompoundFinanceState>
            </div>
        )
    }

}

export default App