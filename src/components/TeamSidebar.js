import React from 'react';
import { Grid } from 'semantic-ui-react';

const TeamSidebar = ({
  teamName, username, channelNames, usersToDm,
}) => (
  <Grid>
    <Grid.Row>
      {teamName}
      {username}
    </Grid.Row>
    <Grid.Row>
      {channelNames.map(cn => <p>{cn}</p>)}
    </Grid.Row>
    <Grid.Row>
      Direct Message
      {usersToDm.map(person => <p>{person}</p>)}
    </Grid.Row>
  </Grid>
);

export default TeamSidebar;
