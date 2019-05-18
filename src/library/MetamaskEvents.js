
const MetamaskEvents = () => {
    window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();
    })

    window.ethereum.on('networkChanged', function (netId) {
        window.location.reload();
    })
}

export default MetamaskEvents()