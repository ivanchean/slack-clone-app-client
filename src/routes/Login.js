import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path 
        message
      }
    }
  }
`;

export default observer(class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  }

  render() {
    const { email, password } = this;    
    return (
      <Container text>
        <div>
          <Header as="h2">Login</Header>
          <Input
            name="email"
            onChange={this.onChange}
            value={email}
            placeholder="Email"
            fluid
          />
          <Input
            name="password"
            onChange={this.onChange}
            value={password}
            type="password"
            placeholder="password"
            fluid
          />
          <Button
            onClick={ async () => {
              console.log(email, password);
            }}  
          >
              Submit
          </Button>
        </div>
      </Container>
    );
  }
});

