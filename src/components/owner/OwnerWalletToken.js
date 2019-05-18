import React, { useContext} from 'react'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'
import { Button } from '@trendmicro/react-buttons'
import {constants} from "ethers/index"
import {utils} from 'ethers'

import ERC20 from "../../library/ERC20Contract"
import FundContract from "../../library/FundContract"
import {TransactionWaitContext} from "../TransactionWait.js";

const OwnerWalletToken = ({symbol, cTokenAddress, underlyingAddress, balance, tokenDecimals, allowance, fundContract}) => {
    const [,setTransactionWaitMessage]  = useContext(TransactionWaitContext)

    let isEth = symbol === "ETH"
    let depositAmount = 0
    let underlyinContract

    if (!isEth) {
        underlyinContract = ERC20.ERC20TokenContract(underlyingAddress).contract
    }

    function unapprove() {
        // setTransactionWaitMessage("Un-Approval sent: txn pending...")
        ERC20.approve(underlyinContract, setTransactionWaitMessage, "Un-Approval sent: txn pending...", fundContract.contract.address, constants.Zero)
    }
    function approve() {
       ERC20.approve(underlyinContract, setTransactionWaitMessage, "Approval sent: txn pending...", fundContract.contract.address, constants.MaxUint256)
    }
    const approveOrUnapproveButton = () => {

        if (allowance === undefined || isEth) {
            return "";
        } else if (allowance) {
            return (
                <Button
                    onClick={() => unapprove()}
                    btnSize="extra-small"
                    className='mt-1 float-right'
                    variant="secondary">Un-Approve</Button>
            )
        }
        return (
            <Button
                onClick={() => approve()}
                btnSize="extra-small"
                className='mt-1 float-right'
                variant="secondary">Approve</Button>
        )

    }

    function depositEth(amount) {
        FundContract.depositEth(fundContract.contract, setTransactionWaitMessage, "Deposit sent: txn pending...", utils.parseUnits(amount, 18))
    }
    function depositToken(amount) {
        try {
            if (amount === -1) {
                FundContract.depositToken(fundContract.contract, setTransactionWaitMessage, "Deposit sent: txn pending...", cTokenAddress, balance)
            } else {
                FundContract.depositToken(fundContract.contract, setTransactionWaitMessage, "Deposit sent: txn pending...", cTokenAddress, utils.parseUnits(amount, tokenDecimals))
            }
        } catch(error) {
            console.error(error);
        }
    }

    const depostForm = () => {
        if (isEth) {
            return (
                <div>
                    <InputGroup
                        size="sm"
                        className='mt-1'>
                        <Input size="5"
                               placeholder="0.0"
                               innerRef={ref => depositAmount = ref}
                        />
                        <InputGroupAddon addonType="append">
                            <Button
                                onClick={() => depositEth(depositAmount.value)}
                                btnSize="extra-small">Deposit</Button>
                        </InputGroupAddon>

                    </InputGroup>
                </div>
            )
        } else if (allowance) {
            return (
                <div>
                    <InputGroup
                        size="sm"
                        className='mt-1'>
                        <Input size="5"
                               placeholder="0.0"
                               innerRef={ref => depositAmount = ref}
                        />
                        <InputGroupAddon addonType="append">
                            <Button
                                onClick={() => depositToken(depositAmount.value)}
                                btnSize="extra-small">Deposit</Button>
                        </InputGroupAddon>
                        <Button
                            onClick={() => depositToken(-1)}
                            btnSize="extra-small"
                        >Deposit All</Button>
                    </InputGroup>
                </div>
            )
        }
        return ""

    }


    return (
        <tr>
            <td>
                {symbol}
            </td>
            <td>
                {parseFloat(utils.formatUnits(balance, tokenDecimals).toString()).toFixed(2)}
            </td>
            <td>
                {depostForm()}
            </td>
            <td>
                {approveOrUnapproveButton()}
            </td>
        </tr>
    )
}

export default OwnerWalletToken
