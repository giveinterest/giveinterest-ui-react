import React, { useEffect, useState } from 'react'

import CompoundCTokenContract from "../library/CompoundCTokenContract"
import Constants from "../constants/index";
import {utils} from "ethers";

export const CompoundFinanceStateContext = React.createContext({})

const CompoundFinanceState = (props) => {

    const [cTokenSupplyRatePerBlockState, setcTokenSupplyRatePerBlock] = useState({})

    useEffect(() => {
        async function resolve() {
            let tmpCTokenSupplyRatePerBlockState = {}
            let cTokenDetails = CompoundCTokenContract.CompoundCTokenContract(Constants.Contracts.cETH.address)
            let result = await CompoundCTokenContract.supplyRatePerBlock(cTokenDetails.contract)
            let interestRate = (parseFloat(utils.formatUnits(result.mul(2102400), 18)) * 100).toFixed(2)
            tmpCTokenSupplyRatePerBlockState[Constants.Contracts.cETH.address] = interestRate

            const cTokenAddresses = Constants.cTokens.map(tokenDetails => tokenDetails.address)
            for (let i = 0; i < cTokenAddresses.length; i++) {
                let cTokenDetails = CompoundCTokenContract.CompoundCTokenContract(cTokenAddresses[i])
                let result = await CompoundCTokenContract.supplyRatePerBlock(cTokenDetails.contract)
                let interestRate = (parseFloat(utils.formatUnits(result.mul(2102400), 18)) * 100).toFixed(2)
                console.log("supplyRatePerBlock: " + interestRate)
                tmpCTokenSupplyRatePerBlockState[cTokenAddresses[i]] = interestRate
            }
            setcTokenSupplyRatePerBlock(tmpCTokenSupplyRatePerBlockState)
        }
        resolve()
    }, [])

    return (
        <CompoundFinanceStateContext.Provider value={{cTokenSupplyRatePerBlockState}}>
            {props.children}
        </CompoundFinanceStateContext.Provider>
    )

}

export default CompoundFinanceState