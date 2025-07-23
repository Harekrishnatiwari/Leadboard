import React, { useState } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await onAddUser(name.trim());
      setName('');
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">➕ Add New User</h6>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              disabled={loading}
            />
            <Button 
              type="submit" 
              variant="success"
              disabled={!name.trim() || loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddUser;
