import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ContainerItem from './container_item'
import Masonry from 'react-masonry-component'

var masonryOptions = {
    transitionDuration: 0
}

class ContainerList extends Component {
  renderContainers(){
    if(this.props.containers){
      var containers = this.props.containers.map(function(container, index){
        return <ContainerItem {...container} key={index} />
      })
      return containers
    }
  }

  render(){
    return(
      <div className='row padded-content row__no_right_margin'>
        <Masonry options={masonryOptions}>
          {this.renderContainers()}
        </Masonry>
      </div>
    )
  }
}

export default ContainerList
