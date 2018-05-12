import React from 'react';
import { Input, Form, Button, Modal } from 'semantic-ui-react';

import '../styles/modal.css';

const AddChannelModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input fluid placeholder="Channel name" />
        </Form.Field>
        <Form.Group>
          <Button fluid>Cancel</Button>
          <Button fluid>Create Channel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default AddChannelModal;
