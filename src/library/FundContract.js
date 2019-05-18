import {ethers} from "ethers"
import Constants from "../constants/index"

const FundContract = (fundAddress) => {
    if (!window.ethereum) {
        return
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = provider.getSigner();

    let localAddress = window.ethereum.selectedAddress
    let interestGivingFund =
        new ethers.Contract(
            fundAddress,
            Constants.ABIs.InterestGivingFund,
            signer)
    return {
        localAddress: localAddress,
        provider: provider,
        signer: signer,
        contract: interestGivingFund
    }
}

async function initialDepositCollateral(interestGivingFund, cTokenAddress) {
    return await interestGivingFund.initialDepositCollateral(cTokenAddress)
}
async function interestAvailableFromSingleToken(interestGivingFund, cTokenAddress) {
    return await interestGivingFund.interestAvailableFromSingleToken(cTokenAddress)
}
async function interestWithdrawer(interestGivingFund) {
    return await interestGivingFund.interestWithdrawer()
}
async function collateralOwner(interestGivingFund) {
    return await interestGivingFund.collateralOwner()
}
async function marketCount(interestGivingFund) {
    return await interestGivingFund.marketCount()
}
async function markets(interestGivingFund, marketIndex) {
    return await interestGivingFund.markets(marketIndex)
}
async function depositEth(interestGivingFund, setTransactionWaitMessage, message, amount) {
    // let transactionHash = await interestGivingFund.value(amount).depositEth()
    let transactionHash = await interestGivingFund.depositEth({value:amount})
    console.log("depositEth(txn_hash): " + transactionHash.hash)
    setTransactionWaitMessage(message)
    let receipt = await interestGivingFund.provider.waitForTransaction(transactionHash.hash)
    setTransactionWaitMessage("")
    console.log("depositEth(block_receipt): " + receipt.transactionHash)

    // I'm not good at React
    window.location.reload()
    // return await interestGivingFund.depositEth({value:amount})
}
async function depositToken(interestGivingFund, setTransactionWaitMessage, message, cTokenAddress, amount) {
    let transactionHash = await interestGivingFund.depositToken(cTokenAddress, amount)
    console.log("depositToken(txn_hash): " + transactionHash.hash)
    setTransactionWaitMessage(message)
    let receipt = await interestGivingFund.provider.waitForTransaction(transactionHash.hash)
    console.log("depositToken(block_receipt): " + receipt.transactionHash)
    setTransactionWaitMessage("")

    // I'm not good at React
    window.location.reload()
    // return await interestGivingFund.depositToken(cTokenAddress, amount)
}
async function withdrawAll(interestGivingFund, setTransactionWaitMessage, message) {
    let transactionHash = await interestGivingFund.withdrawAll()
    console.log("withdrawAll(txn_hash): " + transactionHash.hash)
    setTransactionWaitMessage(message)
    let receipt = await interestGivingFund.provider.waitForTransaction(transactionHash.hash)
    console.log("withdrawAll(block_receipt): " + receipt.transactionHash)
    setTransactionWaitMessage("")

    // I'm not good at React
    window.location.reload()
    //
    // return await interestGivingFund.withdrawAll()
}
async function transferInterestWithdrawer(interestGivingFund, setTransactionWaitMessage, message, newReceviver) {
    let transactionHash = await interestGivingFund.transferInterestWithdrawer(newReceviver)
    console.log("transferInterestWithdrawer(txn_hash): " + transactionHash.hash)
    setTransactionWaitMessage(message)
    let receipt = await interestGivingFund.provider.waitForTransaction(transactionHash.hash)
    console.log("transferInterestWithdrawer(block_receipt): " + receipt.transactionHash)
    setTransactionWaitMessage("")

    // I'm not good at React
    window.location.reload()
    //
    //
    // return await interestGivingFund.transferInterestWithdrawer(newReceviver)
}

async function withdrawInterestEach(interestGivingFund, setTransactionWaitMessage, message) {
    let transactionHash = await interestGivingFund.withdrawInterestEach()
    console.log("withdrawInterestEach(txn_hash): " + transactionHash.hash)
    setTransactionWaitMessage(message)
    let receipt = await interestGivingFund.provider.waitForTransaction(transactionHash.hash)
    console.log("withdrawInterestEach(block_receipt): " + receipt.transactionHash)
    setTransactionWaitMessage("")

    // I'm not good at React
    window.location.reload()
}

async function withdrawInterestAsEth(interestGivingFund, setTransactionWaitMessage, message) {
    let transactionHash = await interestGivingFund.withdrawInterestAsEth()
    console.log("withdrawInterestAsEth(txn_hash): " + transactionHash.hash)
    setTransactionWaitMessage(message)
    let receipt = await interestGivingFund.provider.waitForTransaction(transactionHash.hash)
    console.log("withdrawInterestAsEth(block_receipt): " + receipt.transactionHash)
    setTransactionWaitMessage("")

    // I'm not good at React
    window.location.reload()
}

export default {
    FundContract,
    initialDepositCollateral,
    interestAvailableFromSingleToken,
    interestWithdrawer,
    collateralOwner,
    marketCount,
    markets,
    depositEth,
    depositToken,
    withdrawAll,
    transferInterestWithdrawer,
    withdrawInterestEach,
    withdrawInterestAsEth
}
