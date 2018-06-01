import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';
import { HTTP } from 'meteor/http';
import { WebApp } from 'meteor/webapp';

export const Transactions = new Mongo.Collection('transactions');

if (Meteor.isServer) {
  // Ref. https://forums.meteor.com/t/meteor-webapp-vs-picker-vs-simple-rest-for-rest-api/34034
  // Ref. https://hashnode.com/post/web-api-using-meteor-webapp-ciqgn0ukj0irtdd53uy12h6ia
  WebApp.connectHandlers.use('/api/transactions', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

    if(req.method === 'POST') {

      const {
          client_url,
          client_rest_api_endpoint,
          client_transaction_id,
          bank_account,
          bank_no,
          bank_name,
          bank_short_name,
          amount,
          transferred_datetime,
          is_approved,
          approved_datetime
      } = req.query;

      const _id = Transactions.update(client_transaction_id,
        {
          $set:{
            client_url,
            client_rest_api_endpoint,
            client_transaction_id,
            bank_account,
            bank_no,
            bank_name,
            bank_short_name,
            amount,
            transferred_datetime,
            is_approved,
            approved_datetime
          }
        }
      );

      if(_id) {
        res.writeHead(201); // 201 Created
        res.end();
      } else {
        res.writeHead(503); // 503 Service Unavailable
        res.end();
      }

    } else {
      res.writeHead(403); // 403 Forbiden
      res.end();
    }
  });
}

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
       HTTP.post(endpoint, {
         data: {
           ...one,
           client_transaction_id: _id,
           transferred_datetime: one.createdAt
         }
       }, (error, response) => {
         console.log(error);
         console.log(response);
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
