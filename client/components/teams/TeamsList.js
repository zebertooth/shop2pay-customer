import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Teams } from '../../../imports/collections/teams';

class TeamsList extends Component {
  handleClick(e) {
    e.preventDefault();

    Meteor.call('teams.insert');
  }

  handleRemoveClick(team) {
    Meteor.call('teams.hide', team);
  }

  renderList() {
    return this.props.teams.map((team) => {
      return (
        <li className="list-group-item" key={team._id}>
          {this.props.userId &&
            <button className="btn btn-info">
              Edit
            </button>
          }
          {team.createdAt}
          {this.props.userId &&
            <span className="pull-right">
              <button className="btn btn-danger"
                onClick={() => {this.handleRemoveClick(team)}}>
                X
              </button>
            </span>
          }
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.userId &&
          <li className="list-group-item">
            <button className="btn btn-primary"
              onClick={this.handleClick.bind(this)}>
              Create
            </button>
          </li>
        }
        {this.renderList()}
      </ul>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('teams');

  return {
    teams: Teams.find({}, {sort: {createdAt: -1}}).fetch(),
    userId: Meteor.userId()
  };
})(TeamsList);
