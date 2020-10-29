import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './custom.css';

class FrontCard extends Component {
    render() {
        return (
            <Card className="text-center bg-dark text-white">
                <Card.Body className="d-flex flex-column align-items-center">
                    <Card.Title className="m-auto">{ this.props.title }</Card.Title>
                    <Card.Text className="m-auto">{ this.props.text }</Card.Text>
                    <Button variant="primary" className="m-auto">{ this.props.buttonText }</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default FrontCard;