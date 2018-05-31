import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';

import { Teams } from '../../../imports/collections/teams';

class TeamsList extends Component {
  constructor(props) {
    super(props);
  }

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
          <button className="btn btn-info">
            Edit
          </button>

          {` ${team.createdAt}`}
          <span className="pull-right">
            <button className="btn btn-danger"
              onClick={() => {this.handleRemoveClick(team)}}>
              X
            </button>
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        {this.props.userId &&
          <ul className="list-group">
            <li className="list-group-item">
              <button className="btn btn-primary"
                onClick={this.handleClick.bind(this)}>
                Create
              </button>
            </li>
            <FlipMove maintainContainerHeight={true}>
              {this.renderList()}
            </FlipMove>
          </ul>
        }
      </div>
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
