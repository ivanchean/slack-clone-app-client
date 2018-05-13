import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #51374e;
  color: #9f939e;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-styled: none;
  padding-left: 0;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background-color: #3e313c;
  }
`;

const SideBarListHeader = styled.li`${paddingLeft}`;

const PushLeft = styled.div`${paddingLeft}`;

const Green = styled.span`color: #38978d`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const channel = ({ id, name }, teamId) => (
  <Link to={`/view-team/${teamId}/${id}`} key={`channel-${id}`}>
    <SideBarListItem ># {name}</SideBarListItem>
  </Link>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble on /> {name}
  </SideBarListItem>
);

export default ({
  teamName,
  username,
  channels,
  users,
  onAddChannelClick,
  teamId,
  onInvitePeopleClick,
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>Channels <Icon onClick={onAddChannelClick} name="add circle" /></SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Message</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
    <div>
      <a href="#invite-peoplel" onClick={onInvitePeopleClick}>
        + Invite People
      </a>
    </div>
  </ChannelWrapper>
);

