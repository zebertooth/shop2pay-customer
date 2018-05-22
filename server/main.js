import { Meteor } from 'meteor/meteor';

import { Teams } from '../imports/collections/teams';

Meteor.startup(() => {
  Meteor.publish('teams', function () {
    return Teams.find({ creatorId: this.userId, hiddenAt: null });
  });
});
