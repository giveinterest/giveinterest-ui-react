import React, { useEffect, useState } from 'react'

import FundContractFactory from "../library/FundContractFactory"

export const OwnedFundAddressesContext = React.createContext({})

const OwnedFundAddressesState = (props) => {

    const [ownedFundAddresses, setOwnedFundAddresses] = useState([])

    useEffect(() => {
        async function resolve() {
            setOwnedFundAddresses(await FundContractFactory.ownedAddressList())
        }
        resolve()
    }, [])

    return (
        <OwnedFundAddressesContext.Provider value={ownedFundAddresses}>
            {props.children}
        </OwnedFundAddressesContext.Provider>
    )

}

export default OwnedFundAddressesState;