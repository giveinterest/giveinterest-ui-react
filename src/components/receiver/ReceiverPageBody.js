import React, { useContext } from 'react';
import { Table, Button, Container, Row, Col } from 'reactstrap';
import ReceiverTotals from "./ReceiverTotals.js"
import FundContract from "../../library/FundContract"
import {FundDetailsStateContext} from "../../state/FundDetailsState";
import shortid from "shortid";
import {utils} from "ethers/index";
import {TransactionWaitContext} from "../TransactionWait";

const ReceiverPageBody = () => {
    const fundDetails  = useContext(FundDetailsStateContext)
    const [,setTransactionWaitMessage]  = useContext(TransactionWaitContext)

    function withdrawEach() {

        // key={shortid.generate()}
        // symbol="ETH"
        // cTokenAddress={cTokenAddress}
        // underlyingAddress={undefined}
        // balance={fundDetails.tokenBalancesState["ETH"]}
        // allowance={undefined}
        // tokenDecimals={utils.bigNumberify(18)}
        // fundContract={fundDetails.fundContractState}

        FundContract.withdrawInterestAsEth(
            fundDetails.fundContractState.contract,
            setTransactionWaitMessage,
            "Withdrawing each token with available interest: txn pending...")
    }
    function withdrawAsEth() {
        FundContract.withdrawInterestEach(
            fundDetails.fundContractState.contract,
            setTransactionWaitMessage,
            "Withdrawing interest as eth: txn pending...")

    }

    return (
        <Container>
            <Row style={{ marginTop: 14, marginBottom: 20 }}>
                <Col>
                    <div className="text-center"><h2>Interest-only Giving Fund</h2></div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ReceiverTotals/>
                </Col>
                <Col>
                    <Container>
                        <Row>
                            <Col>
                                <div><h4>How would you like to receive the funds?</h4></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table size="sm" bordered>
                                    <tbody>
                                    <tr>
                                        <td>
                                            1.
                                        </td>
                                        <td>
                                            Withdraw interest from each token.  If interest is available for multiple tokens, you will receive the amount of each.
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => withdrawEach()}
                                            >Go</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            2.
                                        </td>
                                        <td>
                                            Convert interest from all tokens to ETH.  The converted value of all tokens will be received as one ETH transfer.
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => withdrawAsEth()}
                                            >Go</Button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>

                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default ReceiverPageBody