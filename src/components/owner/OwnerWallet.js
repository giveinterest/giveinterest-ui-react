import React from 'react'
import {Table} from 'reactstrap'
import shortid from "shortid"
import Constants from "../../constants/index"
import OwnerWalletToken from "./OwnerWalletToken"
import {utils} from 'ethers'

const OwnerWallet = ({fundDetails}) => {

    return (
        <Table size="sm" bordered>
            <tbody>
            {
                Object.keys(fundDetails.intialDepositCollateralState).map((cTokenAddress) => {
                    if (cTokenAddress === Constants.Contracts.cETH.address) {
                        return <OwnerWalletToken
                            key={shortid.generate()}
                            symbol="ETH"
                            cTokenAddress={cTokenAddress}
                            underlyingAddress={undefined}
                            balance={fundDetails.tokenBalancesState["ETH"]}
                            allowance={undefined}
                            tokenDecimals={utils.bigNumberify(18)}
                            fundContract={fundDetails.fundContractState}
                            />
                    } else {
                        let underlyingAddress = Constants.cTokens.filter(cToken => cToken.address === cTokenAddress)[0].underlying
                        let tokenDetails = Constants.Tokens.filter(token => token.address === underlyingAddress)[0]
                        return <OwnerWalletToken
                            key={shortid.generate()}
                            symbol={tokenDetails.symbol}
                            cTokenAddress={cTokenAddress}
                            underlyingAddress={tokenDetails.address}
                            balance={fundDetails.tokenBalancesState[tokenDetails.symbol]}
                            allowance={fundDetails.tokenAllowanceState[tokenDetails.symbol]}
                            tokenDecimals={tokenDetails.decimals}
                            fundContract={fundDetails.fundContractState}
                            />
                    }
                })
            }
            </tbody>
        </Table>
    )
}

export default OwnerWallet
