import React from 'react';
import { Form, Message, Button, Input, Container, Header } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER = gql`
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

class Register extends React.Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      username, email, password, usernameError, emailError, passwordError,
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Mutation mutation={REGISTER}>
          { (register, { data }) => (
            <div>
              <Header as="h2">Register</Header>
              <Form>
                <Form.Field error={!!usernameError}>
                  <Input
                    name="username"
                    onChange={this.onChange}
                    value={username}
                    placeholder="Username"
                    fluid
                  />
                </Form.Field>
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
                    this.setState({
                      usernameError: '',
                      emailError: '',
                      passwordError: '',
                    });
                    const res = await register({
                      variables: { username, email, password }
                    });
                    const { ok, errors } = res.data.register;
                    if (ok) {
                      this.props.history.push('/');
                    } else {
                      const err = {};
                      errors.forEach(({ path, message }) => {
                        err[`${path}Error`] = message;
                      });
                      console.log('err', err);
                      this.setState(err);
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

export default Register;
