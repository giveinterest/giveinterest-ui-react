import {ethers} from "ethers"
import Constants from "../constants/index"

const ERC20TokenContract = (tokenAddress) => {
    if (!window.ethereum) {
        return
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = provider.getSigner();
    let localAddress = window.ethereum.selectedAddress

    let cTokenContract =
        new ethers.Contract(
            tokenAddress,
            Constants.ABIs.IERC20,
            signer)
    return {
        localAddress: localAddress,
        provider: provider,
        signer: signer,
        contract: cTokenContract
    }
}

async function balanceOf(tokenContract, ownerAddress) {
    return await tokenContract.balanceOf(ownerAddress)
}
async function allowance(tokenContract, ownerAddress, spenderAddress) {
    let allowance = await tokenContract.allowance(ownerAddress, spenderAddress)
    // console.log("allowance(" + tokenContract.address + "): " + allowance.toString())
    return allowance
}
async function approve(tokenContract, setTransactionWaitMessage, message, spenderAddress, amount) {
    let transactionHash = await tokenContract.approve(spenderAddress, amount)
    setTransactionWaitMessage(message)
    console.log("approve(txn_hash): " + transactionHash.hash)
    let receipt = await tokenContract.provider.waitForTransaction(transactionHash.hash)
    console.log("approve(block_receipt): " + receipt.transactionHash)
    setTransactionWaitMessage("")

    // I'm not good at React
   window.location.reload()

}
async function totalSupply(tokenContract) {
    return await tokenContract.totalSupply()
}

export default { ERC20TokenContract, balanceOf, allowance, approve, totalSupply }