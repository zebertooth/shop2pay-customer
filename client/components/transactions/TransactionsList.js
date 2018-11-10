import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';
import DateTimePicker from 'react-datetime-picker';
import numeral from 'numeral';
import moment from 'moment';

import { Transactions } from '../../../imports/collections/transactions';

class TransactionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client_url: 'http://localhost:8080',
      client_rest_api_endpoint: 'http://localhost:8080/api/v1/transactions',
      bank_account: 'John Deo',
      bank_no: '999-9999-999-9',
      bank_name: 'กสิกรไทย',
      bank_short_name: 'KBANK',
      transfer_type: 'ATM',
      amount: 0,
      transferred_datetime: moment().format(),
      date: moment().toDate(),
      transfer_detail: '',
      is_approved: false
    };
    // this.state = {
    //   client_url: 'http://shop2pay-customer.herokuapp.com',
    //   client_rest_api_endpoint: 'http://shop2pay-customer.herokuapp.com/api/v1/transactions',
    //   bank_account: 'John Deo',
    //   bank_no: '999-9999-999-9',
    //   bank_name: 'กสิกรไทย',
    //   bank_short_name: 'KBANK',
    //   transfer_type: 'ATM',
    //   amount: 0,
    //   transferred_datetime: moment().format(),
    //   date: moment().toDate(),
    //   transfer_detail: '',
    //   is_approved: false
    // };
  }
  handleSubmit(e) {
    e.preventDefault();

    const {
      client_url,
      client_rest_api_endpoint,
      bank_account,
      bank_no,
      bank_name,
      bank_short_name,
      transfer_type,
      amount,
      transferred_datetime,
      transfer_detail,
      is_approved
    } = this.state;

    this.props.meteorCall('transactions.insert', {
      client_url,
      client_rest_api_endpoint,
      bank_account,
      bank_no,
      bank_name,
      bank_short_name,
      transfer_type,
      amount,
      transferred_datetime,
      transfer_detail,
      is_approved
    });
  }
  handleClientUrlChange(e) {
    const client_url = e.target.value;
    this.setState({
      ...this.state,
      client_url
    });
  }
  handleClientRestApiEndpointChange(e) {
    const client_rest_api_endpoint = e.target.value;
    this.setState({
      ...this.state,
      client_rest_api_endpoint
    });
  }
  handleBankAccountChange(e) {
    const bank_account = e.target.value;
    this.setState({
      ...this.state,
      bank_account
    });
  }
  handleBankNoChange(e) {
    const bank_no = e.target.value;
    this.setState({
      ...this.state,
      bank_no
    });
  }
  handleBankSelectChange(e) {
    console.log(e.target.value);
    const bank_short_name = e.target.value;
    let bank_name = '';

    switch (bank_short_name) {
      case 'KBANK':
        bank_name = 'Kasikorn Bank';
        break;

      case 'SCB':
        bank_name = 'Siam Commercial';
        break;

      case 'BAY':
        bank_name = 'Bank of Ayudhya';
        break;

      case 'GOV':
        bank_name = 'Goverment Saving Bank';
        break;

      case 'TMB':
        bank_name = 'TMB Bank';
        break;

      case 'KTB':
        bank_name = 'Krungthai Bank';
        break;

      default:

    }

    this.setState({
      ...this.state,
      bank_short_name,
      bank_name
    });
  }
  handleTranferTypeSelectChange(e) {
    const transfer_type = e.target.value;
    this.setState({
      ...this.state,
      transfer_type
    });
  }
  handleAmountChange(e) {
    const amount  = e.target.value;
    this.setState({
      ...this.state,
      amount
    });
  }
  onDateTimePickerChange = (date) => {
    const transferred_datetime = moment(date).format();
    console.log(transferred_datetime);
    this.setState({
      ...this.state,
      transferred_datetime,
      date
    });
  }
  handleTransferDetailChange(e) {
    const transfer_detail = e.target.value;
    this.setState({
      ...this.state,
      transfer_detail
    });
  }
  renderTransactions() {
    return this.props.transactions.map((tran) => {
      return (
        <div className="container" key={tran._id}>
          <div className="col-sm-1"><span className="glyphicon glyphicon-remove"></span></div>
          <div className="col-sm-2">{tran._id}</div>
          <div className="col-sm-1">{tran.bank_short_name}</div>
          <div className="col-sm-2">{tran.transfer_type}</div>
          <div className="col-sm-1 text-right">{ numeral(tran.amount).format('0,0') } ฿</div>
          <div className="col-sm-3">{tran.transferred_datetime}</div>
          <div className="col-sm-2">{tran.transfer_detail}</div>
        </div>
      );
    })
  }
  renderIsApprovedTransactions() {
    return this.props.is_approved_transactions.map((tran) => {
      return (
        <div className="container" key={tran._id}>
          <div className="col-sm-1"><span className="glyphicon glyphicon-ok"></span></div>
          <div className="col-sm-2">{tran._id}</div>
          <div className="col-sm-1">{tran.bank_short_name}</div>
          <div className="col-sm-2">{tran.transfer_type}</div>
          <div className="col-sm-1 text-right">{ numeral(tran.amount).format('0,0') } ฿</div>
          <div className="col-sm-3">{tran.transferred_datetime}</div>
          <div className="col-sm-2">{tran.transfer_detail}</div>
        </div>
      );
    })
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>URL:</label>
            <input className="form-control" type="text"
              value={this.state.client_url}
              onChange={this.handleClientUrlChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>URL ENDPOINT:</label>
            <input className="form-control" type="text"
              value={this.state.client_rest_api_endpoint}
              onChange={this.handleClientRestApiEndpointChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>BANK ACCOUNT:</label>
            <input className="form-control" type="text"
              value={this.state.bank_account}
              onChange={this.handleBankAccountChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>BANK NO.:</label>
            <input className="form-control" type="text"
              value={this.state.bank_no}
              onChange={this.handleBankNoChange.bind(this)}/>
          </div>
          <div>
            <label>BANK NAME:</label>
            <select multiple className="form-control"
              onChange={this.handleBankSelectChange.bind(this)}>
              <option value="KBANK">Kasikorn Bank (KBANK)</option>
              <option value="SCB">Siam Commercial Bank (SCB)</option>
              <option value="BAY">Bank of Ayudhya (BAY)</option>
              <option value="GOV">Goverment Saving Bank (GOV)</option>
              <option value="TMB">TMB Bank (TMB)</option>
              <option value="KTB">Krungthai Bank (KTB)</option>
            </select>
          </div>

          <div>
            <label>TRANSFER TYPE:</label>
            <select multiple className="form-control"
              onChange={this.handleTranferTypeSelectChange.bind(this)}>
              <option>ATM</option>
              <option>Mobile Banking</option>
              <option>Local Bank Transfer</option>
              <option>Other...</option>
            </select>
          </div>

          <div className="form-group">
            <label>AMOUNT:</label>
            <input className="form-control" type="number"
              value={this.state.amount}
              onChange={this.handleAmountChange.bind(this)}/>
          </div>

          <div className="form-group">
            <label>DATE/TIME:</label>
            <div>
              <DateTimePicker
                onChange={this.onDateTimePickerChange}
                value={this.state.date}/>

            </div>
          </div>

          <div className="form-group">
            <label>COMMENT:</label>
            <textarea className="form-control"
              value={this.state.transfer_detail}
              onChange={this.handleTransferDetailChange.bind(this)}></textarea>
          </div>

          <input className="btn btn-primary" type="submit" />
        </form>
        <hr />
        {this.renderTransactions()}
        <hr />
        {this.renderIsApprovedTransactions()}
        <hr />
      </div>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('transactions');

  return {
    transactions: Transactions.find({is_approved: false}, { sort: { createdAt: -1 } }).fetch(),
    is_approved_transactions: Transactions.find({is_approved: { $ne: false }}, { sort: { createdAt: -1 } }).fetch(),
    userId: Meteor.userId(),
    meteorCall: Meteor.call
  };
})(TransactionsList);
