import React, { useContext } from 'react'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import {utils} from "ethers/index"

import FundContract from "../../library/FundContract"
import {TransactionWaitContext} from "../TransactionWait"

const OwnerChangeReceiver = ({fundDetails}) => {
    const [,setTransactionWaitMessage] = useContext(TransactionWaitContext)
    let newReceiverAddress;
    // console.log(fundDetails)

    function transferInterestWithdrawer() {
        if (!utils.isHexString(newReceiverAddress.value) || newReceiverAddress.value.length !== 42) {
            alert('not a valid address')
            return
        }
        try {
            utils.getAddress(newReceiverAddress.value)
        } catch(error) {
            console.error(error)
            alert('not a valid address')
            return
        }
        try {
            FundContract.transferInterestWithdrawer(
                fundDetails.fundContractState.contract,
                setTransactionWaitMessage,
                "Changing withdrawing address: txn pending...",
                newReceiverAddress.value)
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <InputGroup
                size="sm">
                <Input
                    innerRef={ref => newReceiverAddress = ref}
                    placeholder="0x0"/>
                <InputGroupAddon addonType="append">
                    <Button color="warning"
                        onClick={() => transferInterestWithdrawer()}
                        >Change Receiver</Button>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

export default OwnerChangeReceiver
