import React from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';

const UserList = ({ users, selectedUserId, onUserSelect, onClaimPoints, loading }) => {
  const selectedUser = users.find(user => user._id === selectedUserId);

  return (
    <Card className="h-100">
      <Card.Header>
        <h5 className="mb-0">👥 Select User & Claim Points</h5>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>Choose a User:</Form.Label>
          <Form.Select
            value={selectedUserId}
            onChange={(e) => onUserSelect(e.target.value)}
            size="lg"
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.totalPoints} points)
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {selectedUser && (
          <div className="mb-3 p-3 bg-light rounded">
            <h6>Selected User: <strong>{selectedUser.name}</strong></h6>
            <p className="mb-1">Current Points: <strong>{selectedUser.totalPoints}</strong></p>
            <p className="mb-0">Current Rank: <strong>#{selectedUser.rank}</strong></p>
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          className="w-100"
          onClick={onClaimPoints}
          disabled={!selectedUserId || loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Claiming...
            </>
          ) : (
            '🎲 Claim Random Points (1-10)'
          )}
        </Button>

        <div className="mt-3 text-center">
          <small className="text-muted">
            Click to award 1-10 random points to the selected user
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserList;
