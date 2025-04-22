import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/app/pages/Home';
import Login from '@/app/pages/Login';
import Dashboard from '@/app/pages/Dashboard';
import SubmitApp from '@/app/pages/SubmitApp';
import Marketplace from '@/app/pages/Marketplace';
import AdminReview from '@/app/pages/AdminReview';
import { ChatWidget } from '@/modules/customerSupport';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-app" element={<SubmitApp />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/admin" element={<AdminReview />} />
      </Routes>
      <ChatWidget />
    </Router>
  );
}