import { Meteor } from 'meteor/meteor';

import { Teams } from '../imports/collections/teams';
import { Transactions } from '../imports/collections/transactions';

Meteor.startup(() => {
  Meteor.publish('teams', function () {
    return Teams.find({ creatorId: this.userId, hiddenAt: null });
  });

  Meteor.publish('transactions', function () {
    return Transactions.find({ creatorId: this.userId }, { sort: { createdAt: -1 } });
  });
});
