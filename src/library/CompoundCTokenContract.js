import {ethers} from "ethers"
import Constants from "../constants/index"

const CompoundCTokenContract = (cTokenAddress) => {
    if (!window.ethereum) {
        return
    }
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = provider.getSigner()
    let localAddress = window.ethereum.selectedAddress

    let cTokenContract =
        new ethers.Contract(
            cTokenAddress,
            Constants.ABIs.cToken,
            signer)
    return {
        localAddress: localAddress,
        provider: provider,
        signer: signer,
        contract: cTokenContract
    }
}

async function supplyRatePerBlock(cTokenContract) {
    return await cTokenContract.supplyRatePerBlock()
}

export default { CompoundCTokenContract, supplyRatePerBlock }