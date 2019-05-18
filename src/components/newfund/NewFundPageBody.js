import React, { useContext } from 'react'
import { FormGroup, CustomInput, Table, InputGroup, Input, Button, Container, Row, Col } from 'reactstrap'
import shortid from "shortid"
import Constants from "../../constants/index"
import FundContractFactory from "../../library/FundContractFactory"
import {TransactionWaitContext} from "../TransactionWait"
import {ethers} from "ethers/index";

const NewFundPageBody = () => {
    const [,setTransactionWaitMessage]  = useContext(TransactionWaitContext)

    var newReceiverAddress
    let theMarkets = []

    const newMarketSelected = market => {
        if (market.checked) {
            if (theMarkets.indexOf(market.address) === -1) {
                theMarkets = [...theMarkets, market.address]
            }
        } else {
            theMarkets = theMarkets.filter(aMarket => aMarket !== market.address)
        }
        // console.log("theMarkets: " + theMarkets)
    }

    const createNewFund = () => {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        let interestGivingFundFactory =
            new ethers.Contract(
                Constants.Contracts.InterestGivingFundFactory.address,
                Constants.ABIs.InterestGivingFundFactory,
                provider.getSigner())

        FundContractFactory.createFund(
            interestGivingFundFactory,
            setTransactionWaitMessage,
            "Create new fund: waiting for transaction to be mined.",
            theMarkets,
            newReceiverAddress.value);
    }

    const someItems = []
    someItems.push(
        <CustomInput
            onChange={e => newMarketSelected({ address: Constants.Contracts.cETH.address, checked: e.target.checked })}
            key={shortid.generate()}
            type="switch"
            id={Constants.Contracts.cETH.address}
            name="customSwitch"
            label="ETH"/>)

    Constants.cTokens.forEach(cTokenDetails => {
        let tokenDetails = Constants.Tokens.filter(token => cTokenDetails.underlying === token.address)[0]
        // console.log(tokenDetails)
        someItems.push(
            <CustomInput
                onChange={e => newMarketSelected({ address: cTokenDetails.address, checked: e.target.checked })}
                key={shortid.generate()}
                type="switch"
                id={cTokenDetails.address}
                name="customSwitch"
                label={tokenDetails.symbol} />)
    })
    // if (!window.ethereum.selectedAddress) {
    //     return ""
    // }

    return (
        <Container>
            <Row style={{ marginTop: 34, marginBottom: 20 }}>
                <Col>
                    <h2>Create new Interest-only Giving Fund</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <form>
                        <InputGroup size="sm" >
                            <Table size="sm">
                                <tbody>
                                <tr>
                                    <td width="40%">This address will be allowed to withdraw any interest generated from the fund's deposits:
                                        <br/>(This address can be updated after fund is created.)</td>
                                    <td>
                                        <Input
                                            // ref={newReceiverAddress}
                                           innerRef={ref => newReceiverAddress = ref}
                                            pre={window.ethereum.selectedAddress}
                                            />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Fund will allow deposit of these tokens:
                                        <br/>(Select at least one.)</td>
                                    <td>
                                        <FormGroup>
                                            <div>
                                                {someItems}
                                            </div>
                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <Button onClick={() => createNewFund()} color="warning">Create Fund</Button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default NewFundPageBody