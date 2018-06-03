import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';
import DateTimePicker from 'react-datetime-picker';
import numeral from 'numeral';

import { Transactions } from '../../../imports/collections/transactions';

class TransactionsList extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   client_url: 'http://localhost:8080',
    //   client_rest_api_endpoint: 'http://localhost:8080/api/transactions',
    //   bank_account: 'John Deo',
    //   bank_no: '999-9999-999-9',
    //   bank_name: 'กสิกรไทย',
    //   bank_short_name: 'KBANK',
    //   transfer_type: 'ATM',
    //   amount: 0,
    //   transferred_datetime: new Date(),
    //   is_approved: false
    // };
    this.state = {
      client_url: 'http://shop2pay-customer.herokuapp.com/',
      client_rest_api_endpoint: 'http://shop2pay-customer.herokuapp.com/api/transactions',
      bank_account: 'John Deo',
      bank_no: '999-9999-999-9',
      bank_name: 'กสิกรไทย',
      bank_short_name: 'KBANK',
      transfer_type: 'ATM',
      amount: 2699,
      transferred_datetime: new Date(),
      is_approved: false
    };
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
        bank_name = 'กสิกรไทย';
        break;

      case 'SCB':
        bank_name = 'ไทยพาณิชย์';
        break;

      case 'BAY':
        bank_name = 'กรุงศรี';
        break;

      case 'GOV':
        bank_name = 'ออมสิน';
        break;

      case 'TMB':
        bank_name = 'ทหารไทย';
        break;

      case 'KTB':
        bank_name = 'กรุงไทย';
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
    const transferred_datetime = date;
    console.log(transferred_datetime);
    this.setState({...this.state, transferred_datetime});
  }
  renderTransactions() {
    return this.props.transactions.map((tran) => {
      return (
        <div className="container" key={tran._id}>
          <div className="col-sm-1"><span className="glyphicon glyphicon-remove"></span></div>
          <div className="col-sm-2">{tran._id}</div>
          <div className="col-sm-2">{tran.bank_short_name}</div>
          <div className="col-sm-2">{tran.transfer_type}</div>
          <div className="col-sm-1 text-right">{ numeral(tran.amount).format('0,0') } ฿</div>
          <div className="col-sm-4">{tran.transferred_datetime.toString()}</div>
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
          <div className="col-sm-2">{tran.bank_short_name}</div>
          <div className="col-sm-2">{tran.transfer_type}</div>
          <div className="col-sm-1 text-right">{ numeral(tran.amount).format('0,0') } ฿</div>
          <div className="col-sm-4">{tran.transferred_datetime.toString()}</div>
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
              <option value="KBANK">กสิกรไทย (KBANK)</option>
              <option value="SCB">ไทยพาณิชย์ (SCB)</option>
              <option value="BAY">กรุงศรี (BAY)</option>
              <option value="GOV">ออมสิน (GOV)</option>
              <option value="TMB">ทหารไทย (TMB)</option>
              <option value="KTB">กรุงไทย (KTB)</option>
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
                value={this.state.transferred_datetime}/>

            </div>
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
