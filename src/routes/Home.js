import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_USERS = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

const Home = () => (
  <Query query={ALL_USERS} >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.allUsers.map(({ id, email }) => (
        <div key={id}>
          <p>{email}</p>
        </div>
      ));
    }}
  </Query>
);

export default Home;

