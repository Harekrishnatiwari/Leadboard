import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import UserList from './components/UserList';
import Leaderboard from './components/Leaderboard';
import AddUser from './components/AddUser';
import ClaimHistory from './components/ClaimHistory';
import { getUsers, getLeaderboard, claimPoints, addUser } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users');
      toast.error('Failed to fetch users');
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await getLeaderboard();
      setLeaderboard(response.data);
    } catch (error) {
      setError('Failed to fetch leaderboard');
      toast.error('Failed to fetch leaderboard');
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      toast.warning('Please select a user first');
      return;
    }

    setLoading(true);
    try {
      const response = await claimPoints(selectedUserId);
      const { userName, pointsClaimed, totalPoints } = response.data;
      
      toast.success(`${userName} claimed ${pointsClaimed} points! Total: ${totalPoints}`);
      
      // Refresh data
      await fetchUsers();
      await fetchLeaderboard();
    } catch (error) {
      toast.error('Failed to claim points');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (name) => {
    try {
      await addUser(name);
      toast.success(`User ${name} added successfully!`);
      await fetchUsers();
      await fetchLeaderboard();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add user');
      }
    }
  };

  return (
    <div className="App">
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center text-primary">🏆 User Points Leaderboard</h1>
            <p className="text-center text-muted">
              Select a user and claim random points to see the dynamic rankings!
            </p>
          </Col>
        </Row>

        {error && (
          <Row className="mb-3">
            <Col>
              <Alert variant="danger" onClose={() => setError('')} dismissible>
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col lg={4} className="mb-4">
            <UserList
              users={users}
              selectedUserId={selectedUserId}
              onUserSelect={setSelectedUserId}
              onClaimPoints={handleClaimPoints}
              loading={loading}
            />
            <div className="mt-4">
              <AddUser onAddUser={handleAddUser} />
            </div>
          </Col>

          <Col lg={5} className="mb-4">
            <Leaderboard leaderboard={leaderboard} />
          </Col>

          <Col lg={3} className="mb-4">
            <ClaimHistory />
          </Col>
        </Row>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
