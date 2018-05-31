import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';

export const Transactions = new Mongo.Collection('transactions');

Meteor.methods({
  'transactions.insert': function(transaction) {
     return Transactions.insert({
       ...transaction,
       createdAt: moment().valueOf(),
       creatorId: this.userId
     });
  }
});
