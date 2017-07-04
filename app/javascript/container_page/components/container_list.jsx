import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ContainerItem from './container_item'

class ContainerList extends Component {
  renderContainers(){
    if(this.props.containers){
      var containers = this.props.containers.map(function(container, index){
        return <ContainerItem {...container} key={index} handleRemoveItem={this.props.handleRemoveItem} handleEditItem={this.props.handleEditItem} />
      }, this)
      return containers
    }
  }

  render(){
    return(
      <div className='row padded-content row__no_right_margin'>
        {this.renderContainers()}
      </div>
    )
  }
}

export default ContainerList
