import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel, Button } from 'react-bootstrap'

class ContainerItem extends Component {
  renderActionButtons(){
    return(
      <div>
        <div className='pull-right'>
          <Button bsStyle='info' bsSize='xs' onClick={() => this.props.handleEditItem(this.props.id)}>Edit</Button>&nbsp;
          <Button bsStyle='danger' bsSize='xs' onClick={() => this.props.handleRemoveItem(this.props.id)}>Delete</Button>
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }

  render(){
    return(
      <div className='col-xs-4'>
        <Panel footer={this.renderActionButtons()}>
          <h3>{this.props.name}</h3>
          <p className='small'>
            {this.props.description || "No description available"}
          </p>
        </Panel>
      </div>
    )
  }
}

export default ContainerItem
