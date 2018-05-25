import gql from 'graphql-tag';

/* eslint-disable-next-line */
export const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;