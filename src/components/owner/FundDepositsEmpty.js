import React from 'react';
import { Table, Container, Row, Col } from 'reactstrap';

const FundDepositsEmpty = () => {

    return (
        <Container>
            <Row>
                <Col>
                </Col>
                <Col>
                    <div><h3>Deposits</h3></div>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table size="sm" borderless>
                        <thead>
                        <tr>
                            <th>Amount<br/>(No Interest)</th>
                            <th>Interest</th>
                            <th>Token</th>
                            <th>APR</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
};
export default FundDepositsEmpty
