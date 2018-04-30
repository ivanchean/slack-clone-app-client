import React from 'react';
import { Grid } from 'semantic-ui-react'

import TeamSidebar from '../components/TeamSidebar';
import TeamHeader from '../components/TeamHeader';
import MessageInput from '../components/MessageInput';

export default () => (
  <Grid>
    <Grid.Column width={3}>
      <TeamSidebar
        teamName="ivanchean is Cool"
        username="ivanchean the first"
        channelNames={['general', 'freedom']}
        usersToDm={['slackbot', 'ivanchean the first', 'ivanchean the second']}
      />
    </Grid.Column>
    <Grid.Column width={10}>
      <TeamHeader />
      <MessageInput />
    </Grid.Column>
  </Grid>
);
