import React from 'react';

const Network = () => {
    if (window.ethereum.networkVersion === "1") {
        return (
            <React.Fragment>Mainnet</React.Fragment>
        )
    } else if (window.ethereum.networkVersion === "4") {
        return (
            <React.Fragment>Rinkeby</React.Fragment>
        )
    }
    return (
        <React.Fragment>Other</React.Fragment>
    )
}

export default Network