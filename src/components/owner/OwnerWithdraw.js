import React, {useContext} from 'react'
import {Button, Row, Col, Container} from 'reactstrap'
import FundContract from "../../library/FundContract"
import {TransactionWaitContext} from "../TransactionWait"

const OwnerWithdraw = ({fundDetails}) => {
    const [,setTransactionWaitMessage]  = useContext(TransactionWaitContext)
    function withdrawAll() {
        try {
            FundContract.withdrawAll(fundDetails.fundContractState.contract, setTransactionWaitMessage, "Withdraw sent: txn pending...")
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                        <Button color="info"
                            onClick={() => withdrawAll()}
                        >Withdraw All Deposits</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default OwnerWithdraw
