import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel } from 'react-bootstrap'

class ContainerItem extends Component {
  render(){
    return(
      <div className='col-xs-4'>
        <Panel header={this.props.name} bsStyle='info'>
          <p className='small'>
            {this.props.description}
          </p>
        </Panel>
      </div>
    )
  }
}

export default ContainerItem
