import React, { useContext } from 'react'
import { DropdownMenu, DropdownItem } from 'reactstrap'
import shortid from 'shortid'
import {OwnedFundAddressesContext} from "../../state/OwnedFundAddressesState"

const OwnerFundsList = () => {
    const ownedFundAddressesContext  = useContext(OwnedFundAddressesContext)

    const listItems = ownedFundAddressesContext.map((address) =>
        <DropdownItem key={shortid.generate()}><a href={"/fund/" + address}>{address}</a></DropdownItem>
    )

    return (

        <DropdownMenu right>
                {listItems}
        </DropdownMenu>
    )
}

export default OwnerFundsList
