import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import SubmitProgram from '@/pages/SubmitProgram';
import Marketplace from '@/pages/Marketplace';
import AdminReview from '@/pages/AdminReview';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-program" element={<SubmitProgram />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/admin" element={<AdminReview />} />
      </Routes>
    </Router>
  );
}