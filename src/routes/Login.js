import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path 
        message
      }
    }
  }
`;

class Login extends React.Component {
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
        <Mutation mutation={LOGIN}>
        { (login, { data }) => (
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
                  try {
                    const res = await login({ 
                      variables: { email, password },
                    });
                    console.log(res);
                    const { ok, token, refreshToken } = res.data.login;
                    if (ok) {
                      localStorage.setItem('token', token);
                      localStorage.setItem('refreshToken', refreshToken);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}  
              >
                  Submit
              </Button>
            </div>
          )
        }
        </Mutation>
      </Container>
    );
  }
};

export default observer(Login);

