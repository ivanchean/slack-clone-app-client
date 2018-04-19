import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Message, Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      user {
        id
      }
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
      errors: {},
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  render() {
    const { email, password, errors: { emailError, passwordError } } = this;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Mutation mutation={LOGIN}>
          { (login, { data }) => (
            <div>
              <Header as="h2">Login</Header>
              <Form>
                <Form.Field error={!!emailError}>
                  <Input
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    placeholder="Email"
                    fluid
                  />
                </Form.Field>
                <Form.Field error={!!passwordError}>
                  <Input
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    type="password"
                    placeholder="password"
                    fluid
                  />
                </Form.Field>
                <Button
                  onClick={async () => {
                    const res = await login({
                      variables: { email, password },
                    });
                    const {
                      ok, token, refreshToken, errors, user,
                    } = res.data.login;
                    if (ok) {
                      localStorage.setItem('userId', user.id);
                      localStorage.setItem('token', token);
                      localStorage.setItem('refreshToken', refreshToken);
                      this.props.history.push('/');
                    } else {
                      const err = {};
                      errors.forEach(({ path, message }) => {
                        err[`${path}Error`] = message;
                      });
                      this.errors = err;
                    }
                  }}
                >
                  Submit
                </Button>
              </Form>
            </div>
            )
          }
        </Mutation>
        {
          // Error List
          errorList.length ? (
            <Message error header="There are some errors with your submission" list={errorList}></Message>
          ) : null
        }
      </Container>
    );
  }
}

export default observer(Login);

