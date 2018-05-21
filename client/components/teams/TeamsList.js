import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Teams } from '../../../imports/collections/teams';

class TeamsList extends Component {
  render() {
    console.log(this.props.teams);
    return (
      <div>Teams List</div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('teams');

  return {
    teams: Teams.find({}).fetch()
  };
}, TeamsList);
