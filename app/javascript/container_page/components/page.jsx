import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ContainerList from './container_list'
import ModalButtonTrigger from '../../shared/modal_button_trigger'
import ModalForm from './modal_form'
import { Pagination } from 'react-bootstrap'
import $ from 'jquery'

class Page extends Component {
  constructor(props){
    super(props)
    let initial_state = $.extend({}, this.props, {showModal: false, modalErrors: ""})
    this.state = initial_state
  }

  handleAlertDismiss(e){
    this.setState({modalErrors: ""})
  }

  handleInputChange(e){
    let new_record = this.state.record
    new_record[e.target.id] = e.target.value
    this.setState({record: new_record})
  }

  handlePageChange(pageNumber){
    $.ajax({
      method: 'get',
      dataType: 'json',
      url: '/paginated_containers',
      data: {current_page: pageNumber},
      success: (data) => {
        this.setState({containers: data.containers, active_page: parseInt(data.active_page)})
      }
    });
  }

  displayModal(){
    $.ajax({
      method: 'get',
      dataType: 'json',
      url: '/containers/new',
      success: (data) => {
        this.setState({record: data.new_record, showModal: true})
      }
    });
  }

  hideModal(){
    this.setState({record: {}, showModal: false, modalErrors: ""})
  }

  submitForm(){
    let form_params = {}
    form_params['record']       = this.state.record
    form_params['active_page']  = this.state.active_page

    $.ajax({
      method: 'post',
      data: form_params,
      dataType: 'json',
      url: '/containers',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-CSRF-Token', this.props.authenticity_token)
      },
      success: (data) => {
        this.setState({modalErrors: "", containers: JSON.parse(data.containers), active_page: data.active_page, total_pages: data.total_pages, record: {}, showModal: false})
      },
      error: (data) => {
        this.setState({modalErrors: data.responseJSON.errors})
      }
    });
  }

  render(){
    return(
      <div>
        <ModalButtonTrigger displayModal={this.displayModal.bind(this)}/>
        <ContainerList {...this.state} />
        <div className='row row__no_right_margin'>
          <div className='col-xs-12'>
            <Pagination prev next first last ellipsis boundaryLinks items={this.state.total_pages} activePage={this.state.active_page} onSelect={ (pageNumber) => {this.handlePageChange(pageNumber)}}/>
          </div>
        </div>
        <ModalForm modalErrors={this.state.modalErrors} record={this.state.record} handleAlertDismiss={this.handleAlertDismiss.bind(this)} handleInputChange={this.handleInputChange.bind(this)} showModal={this.state.showModal} hideModal={this.hideModal.bind(this)} submitForm={this.submitForm.bind(this)}/>
      </div>
    )
  }
}

const main = {
  initialize(){
    let listElement = document.querySelector('.container-listing')
    if(listElement){
      ReactDOM.render(
        <Page containers={JSON.parse(listElement.dataset['containers'])} active_page={1} total_pages={parseInt(listElement.dataset['totalPages'])} authenticity_token={listElement.dataset['authenticityToken']}
        />, listElement
      )
    }
  },

  uninitialize(){
    let listElement = document.querySelector('.container-listing')
    if(listElement){
      ReactDOM.unmountComponentAtNode(listElement)
    }
  }
}

export{main}
