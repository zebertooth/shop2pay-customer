import React, { Component } from 'react';

import Accounts from './Accounts';

class Header extends Component {
  handleClick(e) {
    e.preventDefault();

    Meteor.call('teams.insert');
  }
  render() {
    return (
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <a className="navbar-brand">Authen-Twbs</a>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Accounts />
          </li>
          <li>
            <a href="#"
              onClick={this.handleClick.bind(this)}>
              Create Team
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
