import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  
  render() {

    const { username, email, password } = this.state;

    return (
      <Container>
        <Mutation mutation={REGISTER}>
        { (register, { data }) => (
            <div>
              <Header as="h2">Register</Header>
              <Input name="username" onChange={this.onChange} value={username}  placeholder="Username" fluid />
              <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
              <Input name="password" onChange={this.onChange} value={password} type="password" placeholder="password" fluid/>
              <Button 
                onClick={ async e => {
                  try {
                    await register({ variables: { username, email, password } });
                    alert('注册成功！');
                    this.setState({ username: '', email: '', password: '' });
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
}

const REGISTER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`; 

export default Register;