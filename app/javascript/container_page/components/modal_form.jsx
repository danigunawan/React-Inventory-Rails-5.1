import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap'

class ModalForm extends Component {
  textInput(label){
    return(
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl id={label} type='text' value={this.props.record[label] ? this.props.record[label] : ""} onChange={this.props.handleInputChange}></FormControl>
      </FormGroup>
    )
  }

  textArea(label){
    return(
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl id={label} componentClass='textarea' value={this.props.record[label] ? this.props.record[label] : ""} onChange={this.props.handleInputChange}></FormControl>
      </FormGroup>
    )
  }

  renderModalBody(){
    if(this.props.record){
      return(
        <Modal.Body>
          {this.renderError()}
          {this.textInput('name')}
          {this.textArea('description')}
        </Modal.Body>
      )
    }
  }

  renderError(){
    if(this.props.modalErrors){
      return(
        <Alert bsStyle="danger" onDismiss={this.props.handleAlertDismiss}>{this.props.modalErrors}</Alert>
      )
    }
  }

  render(){
    return(
      <Modal show={this.props.showModal} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Container</Modal.Title>
        </Modal.Header>
        {this.renderModalBody()}
        <Modal.Footer>
          <Button bsStyle='primary' onClick={() => this.props.submitForm(this.props.form_url, this.props.form_method)}>Submit</Button>
          <Button onClick={this.props.hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalForm
