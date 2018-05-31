import React, { Component } from 'react';

import Accounts from './Accounts';

class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Shop2Pay-Customer</a>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Accounts />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
