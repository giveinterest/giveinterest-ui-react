import React, { useContext } from 'react';
import { Table, Container, Row, Col } from 'reactstrap';

import FundItem from "./FundItem.js";
import Constants from "../../constants/index"
import shortid from 'shortid'
import {CompoundFinanceStateContext} from "../../state/CompoundFinanceState"

const FundDeposits = ({fundDetails}) => {
    const interestRates  = useContext(CompoundFinanceStateContext)



    return (
        <Container>
            <Row>
                <Col>
                </Col>
                <Col>
                    <div><h3>Deposits</h3></div>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table size="sm" borderless>
                        <thead>
                        <tr>
                            <th>Amount<br/>(No Interest)</th>
                            <th>Interest</th>
                            <th>Token</th>
                            <th>APR</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
    Object.keys(fundDetails.intialDepositCollateralState).map((cTokenAddress) => {
        if (cTokenAddress === Constants.Contracts.cETH.address) {
            return <FundItem
                        key={shortid.generate()}
                        token="ETH"
                        interestRate={interestRates.cTokenSupplyRatePerBlockState[cTokenAddress]}
                        interestAvailable={fundDetails.interestAvailableState[cTokenAddress]}
                        depositAmount={fundDetails.intialDepositCollateralState[cTokenAddress]} />
        } else {
            let underlyingAddress = Constants.cTokens.filter(cToken => cToken.address === cTokenAddress)[0].underlying
            let tokenDetails = Constants.Tokens.filter(token => token.address === underlyingAddress)[0]
            console.log(fundDetails.intialDepositCollateralState[cTokenAddress])
            return <FundItem
                        key={shortid.generate()}
                        token={tokenDetails.symbol}
                        interestRate={interestRates.cTokenSupplyRatePerBlockState[cTokenAddress]}
                        interestAvailable={fundDetails.interestAvailableState[cTokenAddress]}
                        depositAmount={fundDetails.intialDepositCollateralState[cTokenAddress]} />
        }
    })
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
};
export default FundDeposits
