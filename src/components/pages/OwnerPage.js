import React, { useContext } from 'react';
import Header from "../Header.js"
import {OwnedFundAddressesContext} from "../../state/OwnedFundAddressesState.js"
import FundDetailsState from "../../state/FundDetailsState.js"
import OwnerPageBody from "../owner/OwnerPageBody.js"

const OwnerPage = (props) => {
    const ownedFundAddressesContext  = useContext(OwnedFundAddressesContext)

    if (ownedFundAddressesContext !== '' && ownedFundAddressesContext.length > 0) {

        let contractAddress
        if (props.fromUrl) {
            contractAddress=window.location.pathname.replace('/fund/', '')
        } else {
            contractAddress = ownedFundAddressesContext[0]
        }
        // contractAddress = ownedFundAddressesContext[0]

        return (
            <div>
                <Header/>
                <br/>
                <FundDetailsState contractAddress={contractAddress}>
                    <OwnerPageBody />
                </FundDetailsState>
            </div>
        )
    }

    return (
        <div>
            <Header/>
        </div>
    )
}

export default OwnerPage