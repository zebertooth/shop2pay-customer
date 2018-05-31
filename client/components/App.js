import React from 'react';

import Header from './Header';
import TeamsList from './teams/TeamsList';
import TransactionsList from './transactions/TransactionsList';

export default () => {
  return (
    <div>
      <Header />
      {/* <TeamsList /> */}
      <TransactionsList />
    </div>
  );
};
