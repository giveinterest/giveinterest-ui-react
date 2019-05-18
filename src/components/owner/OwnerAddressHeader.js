import React from 'react'
import {Col, Container, Row} from "../flexPropsToClasses"

const OwnerAddressHeader = ({fundOwner}) => {

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Owner:</h4>
                </Col>
                <Col className="text-left">
                    <pre>{fundOwner}</pre>
                </Col>
            </Row>
        </Container>
    )
}

export default OwnerAddressHeader
