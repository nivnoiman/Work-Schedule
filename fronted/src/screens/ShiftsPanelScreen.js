import React from 'react'
import TeamMaker from '../components/TeamMaker'
import { Col, Row,Container } from 'react-bootstrap'
import ShiftsMaker from '../components/ShiftsMaker'

const ShiftsPanelScreen = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs='2'>
                    <TeamMaker />
                </Col> 
                <Col xs='10'>
                    <ShiftsMaker /> 
                </Col>
            </Row>
        </Container>
    )
}

export default ShiftsPanelScreen
