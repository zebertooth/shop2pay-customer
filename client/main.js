import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { Teams } from '../imports/collections/teams';

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
