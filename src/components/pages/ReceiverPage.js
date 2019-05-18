import React, { useContext } from 'react';
import Header from "../Header.js"
import ReceiverPageBody from "../receiver/ReceiverPageBody.js";
import {OwnedFundAddressesContext} from "../../state/OwnedFundAddressesState";
import FundDetailsState from "../../state/FundDetailsState"

const ReceiverPage = () => {
        let contractAddress
        contractAddress=window.location.pathname.replace('/withdraw/', '')
        return (
            <div>
                <Header/>
                <br/>
                <FundDetailsState contractAddress={contractAddress}>
                    <ReceiverPageBody />
                </FundDetailsState>
            </div>
        )
}

export default ReceiverPage