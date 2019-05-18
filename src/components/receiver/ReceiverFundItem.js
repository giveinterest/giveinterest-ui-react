import React from 'react'
const ReceiverFundItem = (props) => {
    return (
        <tr>
            <td>
                {props.interestRate}%
            </td>
            <td>
                {props.interestAvailable}
            </td>
            <td>
                {props.token}
            </td>
        </tr>
    )
}

export default ReceiverFundItem
