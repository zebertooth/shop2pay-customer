import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import { Teams } from '../imports/collections/teams';
import { Transactions } from '../imports/collections/transactions';

const Routes = () => (
  <Router>
    <Route exact path="/" component={App} />
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(<Routes />, document.querySelector('.render-target'));
});
