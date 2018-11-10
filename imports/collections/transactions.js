import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';
import moment_tz from 'moment-timezone';
import { HTTP } from 'meteor/http';
import { Picker } from 'meteor/meteorhacks:picker';
import bodyParser from 'body-parser';

export const Transactions = new Mongo.Collection('transactions');

if (Meteor.isServer) {
  // Ref. http://www.meteorpedia.com/read/REST_API
  // Ref. https://forums.meteor.com/t/is-there-a-way-to-receive-requests-get-or-post-on-meteor-server/43127
  // Ref. https://themeteorchef.com/tutorials/server-side-routing-with-picker
  // Ref. https://forums.meteor.com/t/post-data-with-meteorhacks-picker/4657
  Picker.middleware(bodyParser.json());
  Picker.middleware(bodyParser.urlencoded( {extended: true} ) );
  Picker.route('/api/v1/transactions', function(params, req, res, next) {

    const body = req.body;
    delete body._id;

    const remoteAddress = req.connection.remoteAddress;

    if (req.method === 'POST') {
      const result = Transactions.update(body.client_transaction_id, {
        $set: {
          ...body,
          remoteAddress,
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
        // Ref. https://docs.meteor.com/api/http.html
        // Ref. https://themeteorchef.com/tutorials/using-the-http-package
        // Ref. https://www.tutorialspoint.com/meteor/meteor_http.htm
        // const endpoint = 'http://localhost:3000/api/v1/transactions';
        // const endpoint = 'http://shop2pay-dev-test.herokuapp.com/api/v1/transactions';
        // const endpoint = 'http://www.shop2paytest.tk/api/v1/transactions';
        const endpoint = 'http://27.254.163.57/api/v1/transactions';
       HTTP.call('POST', endpoint, {
         data: {
           ...one,
           client_transaction_id: _id
         },
         headers: {
           'Authorization': 'Token token=tb3vQwhAnJc2PNkusWvkgB4pA8wnVLpy7CXpEsz7jL'
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
