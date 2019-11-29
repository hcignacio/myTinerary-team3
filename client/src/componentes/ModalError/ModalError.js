import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import './ModalError.css'

export default class ModalError extends Component {

  mostrar() {
    this.props.mostrar()
  }

  render() {
    return (
      <div>
        <Modal.Dialog>
          <Modal.Header className="py-0 modalHeader">
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>

          <Modal.Body className="d-flex flex-direction-column align-items-baseline justify-content-between">
            <p>{this.props.errors}</p>
            <Button className="p-1" variant="danger" onClick={() => this.mostrar()}>Close</Button>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    )
  }
}
