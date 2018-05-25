import React from 'react';
import { Query } from 'react-apollo';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';
import { allTeamsQuery } from '../graphql/team';

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
  };

  toggleAddChannelModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({ openAddChannelModal: !state.openAddChannelModal }));
  }

  toggleInvitePeopleModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({ openInvitePeopleModal: !state.openInvitePeopleModal }));
  }

  render() {
    const { teams, team } = this.props;
    const { openAddChannelModal, openInvitePeopleModal } = this.state;

    return (
      <Query query={allTeamsQuery} >
        {({
          loading, error,
        }) => {
          if (loading || error) return null;

          let username = '';
          let isOwner = false;

          try {
            const token = localStorage.getItem('token');
            const { user } = decode(token);
            // eslint-disable-next-line prefer-destructuring
            username = user.username;
            isOwner = user.id === team.owner;
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
              onAddChannelClick={this.toggleAddChannelModal}
              onInvitePeopleClick={this.toggleInvitePeopleModal}
              isOwner={isOwner}
            />,
            <AddChannelModal
              teamId={team.id}
              onClose={this.toggleAddChannelModal}
              open={openAddChannelModal}
              key="sidebar-add-channel-modal"
            />,
            <InvitePeopleModal
              teamId={team.id}
              onClose={this.toggleInvitePeopleModal}
              open={openInvitePeopleModal}
              key="invite-people-modal"
            />,
          ];
        }}
      </Query>
    );
  }
}

export default Sidebar;
