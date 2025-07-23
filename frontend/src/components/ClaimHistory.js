import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Badge, Spinner } from 'react-bootstrap';
import { getClaimHistory } from '../services/api';

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await getClaimHistory();
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-100">
      <Card.Header>
        <h6 className="mb-0">📋 Recent Claims</h6>
      </Card.Header>
      <Card.Body className="p-0" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {loading ? (
          <div className="text-center p-4">
            <Spinner animation="border" size="sm" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted">No claims yet</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {history.slice(0, 20).map((claim) => (
              <ListGroup.Item key={claim._id} className="px-3 py-2">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong className="text-primary">{claim.userName}</strong>
                    <br />
                    <small className="text-muted">
                      {formatDate(claim.claimDate)}
                    </small>
                  </div>
                  <div className="text-end">
                    <Badge bg="success" className="mb-1">
                      +{claim.pointsClaimed}
                    </Badge>
                    <br />
                    <small className="text-muted">
                      Total: {claim.totalPointsAfterClaim}
                    </small>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default ClaimHistory;
