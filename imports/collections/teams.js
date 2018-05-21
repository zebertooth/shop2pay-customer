import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';

export const Teams = new Mongo.Collection('teams');

Meteor.methods({
  'teams.insert': function () {
    return Teams.insert({
      teamName: null,
      createdAt: moment().valueOf(),
      updatedAt: null,
      hiddenAt: null,
      creatorId: this.userId,
      updaterId: null,
      hiddenId: null
    });
  },
  'teams.remove': function (team) {
    return Teams.remove(team);
  },
  'teams.update': function (team) {
    return Teams.update(team._id,
      {
        ...team,
        updatedAt: moment().valueOf(),
        updaterId: this.userId
      }
    );
  },
  'teams.hide': function (team) {
    return Teams.update(team._id,
      {
        ...team,
        hiddenAt: moment().valueOf(),
        hiddenId: this.userId
      }
    );
  }
});
