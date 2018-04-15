import React from 'react';
import { Message, Button, Input, Container, Header } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {

  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  
  render() {

    const { username, email, password, usernameError, emailError, passwordError } = this.state;

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
              <Input 
                error={!!usernameError}
                name="username" 
                onChange={this.onChange} 
                value={username}  
                placeholder="Username" 
                fluid 
              />
              <Input 
                error={!!emailError}
                name="email" 
                onChange={this.onChange} 
                value={email} 
                placeholder="Email" 
                fluid 
              />
              <Input 
                error={!!passwordError}
                name="password" 
                onChange={this.onChange} 
                value={password} 
                type="password" 
                placeholder="password" 
                fluid
              />
              <Button 
                onClick={ async () => {
                  this.setState({
                    usernameError: '',
                    emailError: '',
                    passwordError: '',
                  }); 
                  try {
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
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Submit
              </Button>
              {
                // Error List
                usernameError || emailError || passwordError ? (
                  <Message error header="There are some errors with your submission" list={errorList}></Message>
                ) : null
              }
            </div>
          )
        }
        </Mutation>
      </Container>
    );
  } 
}

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

export default Register;