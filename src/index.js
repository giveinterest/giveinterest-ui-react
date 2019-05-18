import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Connectors } from 'web3-react'
import Web3Provider from 'web3-react'

import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';

import './index.css';
import App from './App';

const AppWrapper = () => {
    document.title = 'Interest-Only Giving Fund'

    const { InjectedConnector, NetworkOnlyConnector } = Connectors
    const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] })

    const connectors = { MetaMask }

    return (
        <Web3Provider
            connectors={connectors}
            libraryName={'ethers.js'}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Web3Provider>
    )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<AppWrapper />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
