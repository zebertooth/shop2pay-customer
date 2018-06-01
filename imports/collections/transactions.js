import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';
import { HTTP } from 'meteor/http';

export const Transactions = new Mongo.Collection('transactions');

Meteor.methods({
  'transactions.insert': function(transaction) {
     const _id = Transactions.insert({
       ...transaction,
       createdAt: moment().valueOf(),
       creatorId: this.userId
     });
     const one = Transactions.findOne(_id);
     console.log(one);
     // return _id;
     try {
       // https://docs.meteor.com/api/http.html
       // https://themeteorchef.com/tutorials/using-the-http-package
       // https://www.tutorialspoint.com/meteor/meteor_http.htm
       const endpoint = 'http://shop2pay-dev-test.herokuapp.com/api/transactions';
       HTTP.call('POST', endpoint, {
         data: {
           ...one,
           client_transaction_id: _id,
           transferred_datetime: one.createdAt
         }
       }, (error, response) => {
         if(error) {
           Transactions.remove(_id);
         }
       });
       return _id;
     } catch (e) {
       return false;
     }
  }
});
