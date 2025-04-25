import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/app/pages/Home';
import Login from '@/app/pages/Login';
import SubmitApp from '@/app/pages/SubmitApp';
import Marketplace from '@/app/pages/Marketplace';
import AdminReview from '@/app/pages/AdminReview';
import WaitlistEntries from '@/app/pages/WaitlistEntries';
import MyApps from '@/app/pages/MyApps';
import { ChatWidget } from '@/modules/customerSupport';
import { UserRoleProvider } from '@/modules/userRole';

export default function App() {
  return (
    <Router>
      <UserRoleProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/submit-app" element={<SubmitApp />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/admin" element={<AdminReview />} />
          <Route path="/admin/waitlist" element={<WaitlistEntries />} />
          <Route path="/my-apps" element={<MyApps />} />
          {/* Redirect /dashboard to /my-apps */}
          <Route path="/dashboard" element={<Navigate to="/my-apps" />} />
        </Routes>
        <ChatWidget />
      </UserRoleProvider>
    </Router>
  );
}