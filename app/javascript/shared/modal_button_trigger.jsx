import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'

class ModalButtonTrigger extends Component {
  render(){
    return(
      <div className='row row__no_right_margin'>
        <div className='col-xs-12'>
          <div className='pull-right'>
            <Button bsStyle='primary' bsSize='small' onClick={this.props.displayModal}>Add Container</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalButtonTrigger
