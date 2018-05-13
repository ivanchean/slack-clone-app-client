import React from 'react';
import { Query } from 'react-apollo';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import { allTeamsQuery } from '../graphql/team';

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
  };

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  };

  render() {
    const { teams, team } = this.props;

    console.warn(teams);
    return (
      <Query query={allTeamsQuery} >
        {({
          loading, error,
        }) => {
          if (loading || error) return null;

          let username = '';

          try {
            const token = localStorage.getItem('token');
            const { user } = decode(token);
            // eslint-disable-next-line prefer-destructuring
            username = user.username;
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
          }

          return [
            <Teams key="team-sidebar" teams={teams} />,
            <Channels
              key="channels-sidebar"
              teamName={team.name}
              username={username}
              teamId={team.id}
              channels={team.channels}
              users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
              onAddChannelClick={this.handleAddChannelClick}
            />,
            <AddChannelModal
              teamId={team.id}
              onClose={this.handleCloseAddChannelModal}
              open={this.state.openAddChannelModal}
              key="sidebar-add-channel-modal"
            />,
          ];
        }}
      </Query>
    );
  }
}

export default Sidebar;
