import React, { useContext } from 'react'
import { Container, Row, Col } from 'reactstrap'
import {FundDetailsStateContext} from "../../state/FundDetailsState"
import FundDeposits from "./FundDeposits"
import OwnerPageTitle from "./OwnerPageTitle"
import OwnerAddressHeader from "./OwnerAddressHeader"
import OwnerWallet from "./OwnerWallet"
import OwnerWithdraw from "./OwnerWithdraw"
import Receiver from "../receiver/Receiver"
import OwnerChangeReceiver from "./OwnerChangeReceiver"

const OwnerPageBody = () => {
    const fundDetails  = useContext(FundDetailsStateContext)
    if (Object.keys(fundDetails.intialDepositCollateralState).length === 0 ||
        Object.keys(fundDetails.interestAvailableState).length === 0 ||
        Object.keys(fundDetails.tokenBalancesState).length === 0 ||
        fundDetails.fundContractState.address === ""
    ) {
        return (
            <Container>
                <OwnerPageTitle/>
                <Row>
                    <Col>
                        Loading...
                    </Col>
                </Row>
            </Container>
        )
    }
    // console.log("fundDetails: " + JSON.stringify(fundDetails))

    return (
        <Container>
            <OwnerPageTitle/>
            <Row>
                <Col>
                    <FundDeposits fundDetails={fundDetails}/>
                </Col>
                <Col>
                    <OwnerAddressHeader fundOwner={fundDetails.collateralOwnerState}/>
                    <OwnerWallet fundDetails={fundDetails} />
                </Col>
            </Row>
            <Row style={{ marginTop: 14, marginBottom: 4 }}>
                <Col>
                    <Row style={{ marginTop: 14, marginBottom: 4 }}>
                        <Col>
                            <OwnerWithdraw fundDetails={fundDetails} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 14, marginBottom: 4 }}>
                        <Col>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Receiver interestReceiver={fundDetails.interestWithdrawerState}/>
                    <OwnerChangeReceiver fundDetails={fundDetails}/>
                </Col>
            </Row>
        </Container>
    )
}

export default OwnerPageBody
