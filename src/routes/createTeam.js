import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Message, Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
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

    return (
      <Container text>
        <Mutation mutation={CREATE_TEAM}>
          { (createTeam, { data }) => (
            <div>
              <Header as="h2">Create a Team</Header>
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
                    let res = null;
                    try {
                      res = await createTeam({
                        variables: { name },
                      });
                    } catch (err) {
                      this.props.history.push('/login');
                      return;
                    }
                    const { ok, errors } = res.data.createTeam;
                    if (ok) {
                      this.props.history.push('/');
                    } else {
                      const err = {};
                      errors.forEach(({ path, message }) => {
                        err[`${path}Error`] = message;
                      });
                      this.errors = err;
                    }
                    console.log(res);
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

