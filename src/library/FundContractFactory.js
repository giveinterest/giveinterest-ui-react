import {ethers, utils} from "ethers"
import Constants from "../constants/index"

const FundContractFactory = () => {
    if (!window.ethereum) {
        return
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = provider.getSigner();

    let localAddress = window.ethereum.selectedAddress
    let interestGivingFundFactory =
        new ethers.Contract(
            Constants.Contracts.InterestGivingFundFactory.address,
            Constants.ABIs.InterestGivingFundFactory,
            signer)
    let ownerFilter = interestGivingFundFactory.filters.NewFundCreated(localAddress)
    ownerFilter.fromBlock = Constants.Contracts.InterestGivingFundFactory.startBlock
    ownerFilter.toBlock = "latest"

    return {
        localAddress: localAddress,
        provider: provider,
        signer: signer,
        contract: interestGivingFundFactory,
        ownerFilter: ownerFilter
    }

}

async function ownedAddressList() {
    let factoryData = FundContractFactory()

        console.log(factoryData.ownerFilter)

    let ownedFundAddressArray = []
    let logs = await factoryData.provider.getLogs(factoryData.ownerFilter)

    logs.forEach(fund => {
        var contractAddress = utils.getAddress(utils.hexZeroPad(utils.hexStripZeros(fund.data), 20))
        var fundOwnedBy = utils.getAddress(utils.hexZeroPad(utils.hexStripZeros(fund.topics[1]), 20))
        console.log("FoundOwnedFund: fundAddress=" + contractAddress + " ownedBy=" + fundOwnedBy )
        ownedFundAddressArray.push(contractAddress)
    })
    return ownedFundAddressArray
}

async function createFund(contract, setTransactionWaitMessage, message, selectedMarkets, newReceiverAddress) {

    FundContractFactory()

    console.log({contract, setTransactionWaitMessage, message, selectedMarkets, newReceiverAddress})

    var addressArray = []
    selectedMarkets.forEach(address => {
        addressArray.push(utils.getAddress(address))
    })

    console.log(utils.getAddress(newReceiverAddress) + " " + addressArray)


    contract.createFund(newReceiverAddress, selectedMarkets)



    // console.log()

    // let factoryData = FundContractFactory()
    //
    // if(selectedMarkets.length === 0) {
    //     console.error('must select at least 1 token for new fund')
    //     return
    // }
    // console.log("newReceiverAddress: " + newReceiverAddress)
    // if (!utils.isHexString(newReceiverAddress.value) || (newReceiverAddress.value.length != 42 && newReceiverAddress.value.length != 40)) {
    //     console.error('new fund interest receiver not a valid address')
    //     return
    // }
    // try {
    //     utils.getAddress(newReceiverAddress)
    // } catch(error) {
    //     console.error(error);
    //     console.error('new fund interest receiver not a valid address')
    //     return
    // }


    // let handleEvent = function(ownerAddress, newFundAddress) {
    //     window.location.href = "/fund/" + newFundAddress;
    // };
    // contract.on(contract.ownerFilter, handleEvent);
    // console.log(contract)

//    let transactionHash = await contract.createFund(newReceiverAddress,addressArray)
//     FundContractFactory.createFund(newReceiverAddress,addressArray)
//     console.log("createNewFund(txn_hash): " + transactionHash.hash)
//    setTransactionWaitMessage(message)
//    await contract.provider.waitForTransaction(transactionHash.hash)

}

export default {FundContractFactory, ownedAddressList, createFund}