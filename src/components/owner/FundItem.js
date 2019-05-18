import React from 'react'
const FundItem = (props) => {
    return (
        <tr>
            <td>
                {props.depositAmount}
            </td>
            <td>
                {props.interestAvailable}
            </td>
            <td>
                {props.token}
            </td>
            <td>
                {props.interestRate}%
            </td>
        </tr>
    )
}

export default FundItem
