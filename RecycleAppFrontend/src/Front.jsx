import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import FrontCard from './FrontCard';

class Front extends Component {
    render() {
        return (
         <Container>
            <Row >
                <Col md = {6} xs = {12} className="p-2">
                    <FrontCard 
                        title="Überblick"
                        text="Ein- und Ausgänge, Hinzufügen von Fahrrädern." 
                        buttonText="Zum Überblick"
                    />
                </Col>
                <Col md = {6} xs = {12} className="p-2">
                    <FrontCard 
                        title="Fahrradverkauf"
                        text="Nur verfügbare Räder" 
                        buttonText="Zum Fahrradverkauf"
                    />
                </Col>
            </Row>
            <Row >
                
                <Col md = {6} xs = {12} className="p-2">
                    <FrontCard 
                        title="Teileverkauf"
                        text="Fahrradteile und andere Leistungen." 
                        buttonText="Zum Teileverkauf und anderen Leistungen"
                    />
                </Col>
                <Col md = {6} xs = {12} className="p-2">
                    <FrontCard 
                        title="Verleih"
                        text="Nur verfügbare Räder." 
                        buttonText="Zum Verleih von Rädern"
                    />
                </Col>
            </Row>
            <Row>
            <Col md = {12} xs = {12} className="p-2">
                    <FrontCard 
                        title="Buchhaltung"
                        text="Rechnungen und Finanzen." 
                        buttonText="Zu den Finanzen"
                    />
                </Col>
            </Row>
        </Container>   
        )
    }
}

export default Front;