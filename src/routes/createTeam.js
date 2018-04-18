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
      token
      refreshToken
      errors {
        path 
        message
      }
    }
  }
`;

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {},
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  render() {
    const { name, errors: { nameError } } = this;

    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
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
                <Form.Field error={!!nameError}>
                  <Input
                    name="name"
                    onChange={this.onChange}
                    value={name}
                    placeholder="Name"
                    fluid
                  />
                </Form.Field>
                <Button
                  onClick={async () => {
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

export default observer(CreateTeam);

