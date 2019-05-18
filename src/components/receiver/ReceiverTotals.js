import React, { useContext } from 'react'
import { Table, Container, Row, Col } from 'reactstrap'
import shortid from "shortid";
import Constants from "../../constants";
import {FundDetailsStateContext} from "../../state/FundDetailsState"
import {CompoundFinanceStateContext} from "../../state/CompoundFinanceState"
import ReceiverFundItem from "../receiver/ReceiverFundItem"

const ReceiverTotals = () => {

    const fundDetails  = useContext(FundDetailsStateContext)
    const interestRates  = useContext(CompoundFinanceStateContext)


    const items = Object.keys(fundDetails.intialDepositCollateralState).map((cTokenAddress) => {
        if (cTokenAddress === Constants.Contracts.cETH.address) {
            return <ReceiverFundItem
                key={shortid.generate()}
                token="ETH"
                interestRate={interestRates.cTokenSupplyRatePerBlockState[cTokenAddress]}
                interestAvailable={fundDetails.interestAvailableState[cTokenAddress]}
                depositAmount={fundDetails.intialDepositCollateralState[cTokenAddress]} />
        } else {
            let underlyingAddress = Constants.cTokens.filter(cToken => cToken.address === cTokenAddress)[0].underlying
            let tokenDetails = Constants.Tokens.filter(token => token.address === underlyingAddress)[0]
            console.log(fundDetails.intialDepositCollateralState[cTokenAddress])
            return <ReceiverFundItem
                key={shortid.generate()}
                token={tokenDetails.symbol}
                interestRate={interestRates.cTokenSupplyRatePerBlockState[cTokenAddress]}
                interestAvailable={fundDetails.interestAvailableState[cTokenAddress]}
                depositAmount={fundDetails.intialDepositCollateralState[cTokenAddress]} />
        }
    })










    return (
        <Container>
            <Row>
                <Col>
                    <div><h2>Available for withdraw</h2></div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table size="sm" borderless>
                        <thead>
                        <tr>
                            <th>APR</th>
                            <th>Amount</th>
                            <th>Token</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default ReceiverTotals