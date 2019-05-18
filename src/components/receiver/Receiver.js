import React from 'react'
import {Col, Container, Row} from "../flexPropsToClasses";

const Receiver = ({interestReceiver}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h4>Receiver:</h4>
                </Col>
                <Col className="text-left">
                    <pre>{interestReceiver}</pre>
                </Col>
            </Row>
        </Container>
    )
}

export default Receiver
