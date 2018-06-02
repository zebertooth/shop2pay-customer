import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';

import { Transactions } from '../../../imports/collections/transactions';

class TransactionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client_url: 'http://localhost:8080',
      client_rest_api_endpoint: 'http://localhost:8080/api/transactions',
      bank_account: 'John Deo',
      bank_no: '999-9999-999-9',
      bank_name: 'Kasikorn Bank',
      bank_short_name: 'KBANK',
      amount: 2699,
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
      amount,
      is_approved
    } = this.state;

    this.props.meteorCall('transactions.insert', {
      client_url,
      client_rest_api_endpoint,
      bank_account,
      bank_no,
      bank_name,
      bank_short_name,
      amount,
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
  handleBankNameChange(e) {
    const bank_name = e.target.value;
    this.setState({
      ...this.state,
      bank_name
    });
  }
  handleBankShortNameChange(e) {
    const bank_short_name = e.target.value;
    this.setState({
      ...this.state,
      bank_short_name
    });
  }
  handleAmountChange(e) {
    const amount  = e.target.value;
    this.setState({
      ...this.state,
      amount
    });
  }
  renderTransactions() {
    return this.props.transactions.map((tran) => {
      return (
        <div key={tran._id}>{`${tran.is_approved} ${tran._id}`}</div>
      );
    })
  }
  renderIsApprovedTransactions() {
    return this.props.is_approved_transactions.map((tran) => {
      return (
        <div key={tran._id}>{`${tran.is_approved} ${tran._id}`}</div>
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
          <div className="form-group">
            <label>BANK NAME:</label>
            <input className="form-control" type="text"
              value={this.state.bank_name}
              onChange={this.handleBankNameChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>BANK SHORT NAME:</label>
            <input className="form-control" type="text"
              value={this.state.bank_short_name}
              onChange={this.handleBankShortNameChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>AMOUNT:</label>
            <input className="form-control" type="number"
              value={this.state.amount}
              onChange={this.handleAmountChange.bind(this)}/>
          </div>
          <input className="btn btn-primary" type="submit" />
        </form>
        <hr />
        {this.renderTransactions()}
        <hr />
        {this.renderIsApprovedTransactions()}
      </div>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('transactions');

  return {
    transactions: Transactions.find({is_approved: false}).fetch(),
    is_approved_transactions: Transactions.find({is_approved: { $ne: false }}).fetch(),
    userId: Meteor.userId(),
    meteorCall: Meteor.call
  };
})(TransactionsList);
