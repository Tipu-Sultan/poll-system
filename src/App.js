import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserList from './components/Users/UserList';
import UserDetail from './components/Users/UserDetail';
import CreatePoll from './components/Polls/CreatePoll';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ViewPoll from './components/Polls/ViewPoll';
import ProtectedRoute from './components/ProtectedRoute';
import Update from './components/Auth/Update';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={Dashboard} roles={['Institute', 'Teacher','Student']} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<ProtectedRoute element={UserList} roles={['Institute', 'Teacher']} />} />
          <Route path="/users/:id" element={<ProtectedRoute element={UserDetail} />} />
          <Route path="/profile/:id" element={<UserDetail/>} />
          <Route path="/polls/create" element={<ProtectedRoute element={CreatePoll} roles={['Institute']} />} />
          <Route path="/polls/:role/:questionId" element={<ProtectedRoute element={ViewPoll}  />} />
          <Route path="/users/:id/update" element={<ProtectedRoute element={Update} roles={['Institute', 'Teacher','Student']}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
