import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';

export const Teams = new Mongo.Collection('teams');

Meteor.methods({
  'teams.insert': function () {
    return Teams.insert({
      createdAt: moment().valueOf(),
      updatedAt: null
    });
  },
  'teams.update': function (_id, updates) {
    return Teams.update(_id,
      {
        ...updates,
        updatedAt: moment().valueOf()
      }
    );
  },
  'teams.remove': function (_id) {
    return Teams.remove(_id);
  }
});
