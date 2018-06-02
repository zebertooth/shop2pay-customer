import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';
import { HTTP } from 'meteor/http';
import { Picker } from 'meteor/meteorhacks:picker';
import bodyParser from 'body-parser';

export const Transactions = new Mongo.Collection('transactions');

if (Meteor.isServer) {
  // http://www.meteorpedia.com/read/REST_API
  // https://forums.meteor.com/t/is-there-a-way-to-receive-requests-get-or-post-on-meteor-server/43127
  // https://themeteorchef.com/tutorials/server-side-routing-with-picker
  // https://forums.meteor.com/t/post-data-with-meteorhacks-picker/4657
  Picker.middleware(bodyParser.json());
  Picker.middleware(bodyParser.urlencoded( {extended: true} ) );
  Picker.route('/api/transactions', function(params, req, res, next) {

    const body = req.body;
    delete body._id;

    if (req.method === 'POST') {
      const result = Transactions.update(body.client_transaction_id, {
        $set: {
          ...body,
          approved_datetime: moment().valueOf()
        }
      });

      if (result) {
        res.writeHead(202); // 202 Accepted
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
     delete one._id;

     try {
       // https://docs.meteor.com/api/http.html
       // https://themeteorchef.com/tutorials/using-the-http-package
       // https://www.tutorialspoint.com/meteor/meteor_http.htm
       // const endpoint = 'http://localhost:3000/api/transactions';
       const endpoint = 'http://shop2pay-dev-test.herokuapp.com/api/transactions';
       HTTP.call('POST', endpoint, {
         data: {
           ...one,
           client_transaction_id: _id,
           transferred_datetime: moment().valueOf()
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
