import React from 'react';
import { Card, Table, Badge, Row, Col, Image } from 'react-bootstrap';

const Leaderboard = ({ leaderboard }) => {
  const getRankBadge = (rank) => {
    if (rank === 1) return { variant: 'warning', icon: '🥇' };
    if (rank === 2) return { variant: 'secondary', icon: '🥈' };
    if (rank === 3) return { variant: 'dark', icon: '🥉' };
    return { variant: 'primary', icon: '🏅' };
  };

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <Card className="h-100">
      <Card.Header>
        <h5 className="mb-0">🏆 Live Leaderboard</h5>
      </Card.Header>

      <Card.Body>
        {/* Top 3 Users as Cards */}
       <Row className="mb-4 text-center">
  {top3.map((user, index) => {
    const { variant, icon } = getRankBadge(index + 1);
    const rankClass = index === 0 ? "gold" : index === 1 ? "silver" : "bronze";

    return (
      <Col key={user._id} md={4}>
        <Card className={`top-card shadow-sm border-0 ${rankClass}`}>
          <Card.Body>
            <h5>
              <Badge bg={variant}>{icon} #{index + 1}</Badge>
            </h5>
            <h6>{user.name}</h6>
            <p className="mb-1 text-success fw-bold">{user.totalPoints} 🏆</p>
          </Card.Body>
        </Card>
      </Col>
    );
  })}
</Row>


        {/* Leaderboard Table */}
        {rest.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted">No other users found</p>
          </div>
        ) : (
          <Table responsive striped hover className="mb-0">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((user, index) => {
                const actualRank = index + 4; // since top 3 are above
                const { variant, icon } = getRankBadge(actualRank);
                return (
                  <tr key={user._id}>
                    <td>
                      <Badge bg={variant} className="me-2">
                        {icon} {actualRank}
                      </Badge>
                    </td>
                    <td>
                      <strong>{user.name}</strong>
                    </td>
                    <td>
                      <Badge bg="success" pill>
                        {user.totalPoints}
                      </Badge>
                      🏆
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;
