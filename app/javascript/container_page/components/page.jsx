import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ContainerList from './container_list'
import ModalButtonTrigger from '../../shared/modal_button_trigger'
import ModalForm from './modal_form'
import { Pagination, Alert } from 'react-bootstrap'
import $ from 'jquery'

class Page extends Component {
  constructor(props){
    super(props)
    let formProps = {
      showModal: false,
      modalErrors: "",
      form_url: "",
      form_method: "",
    }
    let pageTransactionProps = {
      pageTransactionProps: {
        message: "",
        status: "info"
      }
    }
    let initial_state = $.extend({}, this.props, formProps, pageTransactionProps)
    this.state = initial_state
  }

  displayModal(){
    $.ajax({
      method: 'get',
      dataType: 'json',
      url: '/containers/new',
      success: (data) => {
        this.setState({form_url: "/containers", form_method: "post", record: data.new_record, showModal: true})
      }
    });
  }

  handleAlertDismiss(e){
    this.setState({modalErrors: ""})
  }

  handleEditItem(id){
    $.ajax({
      method: 'get',
      dataType: 'json',
      url: '/containers/' + id + '/edit',
      success: (data) => {
        this.setState({form_url: ("/containers/" + id), form_method: "put", record: data.record, showModal: true})
      }
    });
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

  handleTransactionDismiss(e){
    let alerts = this.state.pageTransactionProps
    alerts['message'] = ""
    alerts['status']  = "info"
    this.setState({pageTransactionProps: alerts})
  }

  handleRemoveItem(id){
    let form_params = {}
    form_params['active_page']  = this.state.active_page
    $.ajax({
      method: 'delete',
      data: form_params,
      dataType: 'json',
      url: '/containers/' + id,
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-CSRF-Token', this.props.authenticity_token)
      },
      success: (data) => {
        this.setState({containers: JSON.parse(data.containers), active_page: data.active_page, total_pages: data.total_pages})
      },
      complete: (data) => {
        let pageTransactionProps        = this.state.pageTransactionProps
        pageTransactionProps['message'] = data.responseJSON.message
        pageTransactionProps['status']  = data.responseJSON.transaction_status
        this.setState({pageTransactionProps: pageTransactionProps})
      }
    });
  }

  hideModal(){
    this.setState({form_url: "", form_method: "", record: {}, showModal: false, modalErrors: ""})
  }

  renderContainerList(){
    if(this.state.total_pages){
      return(
        <div>
          <ContainerList {...this.state} handleEditItem={this.handleEditItem.bind(this)} handleRemoveItem={this.handleRemoveItem.bind(this)} />
          <div className='row row__no_right_margin'>
            <div className='col-xs-12'>
              <Pagination prev next first last ellipsis boundaryLinks items={this.state.total_pages} activePage={this.state.active_page} onSelect={ (pageNumber) => {this.handlePageChange(pageNumber)}}/>
            </div>
          </div>
        </div>
      )
    }else{
      return(
        <div>
          <p>No Containers Available</p>
        </div>
      )
    }
  }

  renderTransactionProps(){
    if (this.state.pageTransactionProps.message){
      return(
        <Alert bsStyle={this.state.pageTransactionProps.status} onDismiss={this.handleTransactionDismiss.bind(this)}>{this.state.pageTransactionProps.message}</Alert>
      )
    }
  }

  submitForm(form_url, form_method){
    let form_params = {}
    form_params['record']       = this.state.record
    form_params['active_page']  = this.state.active_page

    $.ajax({
      method: form_method,
      data: form_params,
      dataType: 'json',
      url: form_url,
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-CSRF-Token', this.props.authenticity_token)
      },
      success: (data) => {
        let pageTransactionProps        = this.state.pageTransactionProps
        pageTransactionProps['message'] = data.message
        pageTransactionProps['status']  = data.transaction_status
        this.setState({modalErrors: "", containers: JSON.parse(data.containers), active_page: data.active_page, total_pages: data.total_pages, record: {}, showModal: false, pageTransactionProps: pageTransactionProps})
      },
      error: (data) => {
        this.setState({modalErrors: data.responseJSON.errors})
      }
    });
  }

  render(){
    return(
      <div>
        {this.renderTransactionProps()}
        <ModalButtonTrigger displayModal={this.displayModal.bind(this)}/>
        {this.renderContainerList()}
        <ModalForm form_method={this.state.form_method} form_url={this.state.form_url} modalErrors={this.state.modalErrors} record={this.state.record} handleAlertDismiss={this.handleAlertDismiss.bind(this)} handleInputChange={this.handleInputChange.bind(this)} showModal={this.state.showModal} hideModal={this.hideModal.bind(this)} submitForm={this.submitForm.bind(this)}/>
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
