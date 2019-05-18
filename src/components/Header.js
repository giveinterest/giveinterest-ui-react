import React, { useState, useContext } from 'react';
import {
    Collapse,
    DropdownMenu,
    DropdownItem,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle } from 'reactstrap';

import Network from "./Network"
import TransactionPendingNotice from "./TransactionPendingNotice"
import OwnerFundsList from "./owner/OwnerFundsList"
import {OwnedFundAddressesContext} from "../state/OwnedFundAddressesState";
import shortid from "shortid";
import Constants from "../constants/index"

const Header = (props) => {
    const ownedFundAddressesContext  = useContext(OwnedFundAddressesContext)

    const [isOpen, setIsOpen] = useState(false)
    function toggle() {
        setIsOpen(!isOpen)
    }

    let createLink;
    if (props.hideCreateLink) {
        createLink = ""
    } else {
        createLink = <NavLink href="/new/">Create New Fund</NavLink>
    }

    const listItems = Object.keys(Constants.Networks).map((network) =>
        <DropdownItem key={shortid.generate()}>{network}</DropdownItem>
    )

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                    <TransactionPendingNotice/>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            {createLink}
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Your Other Funds
                            </DropdownToggle>
                            <OwnerFundsList ownedFundAddressesContext={ownedFundAddressesContext}/>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <Network/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                {listItems}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header
