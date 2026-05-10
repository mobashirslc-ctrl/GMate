// src/app/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import PrivilegeCard from './components/PrivilegeCard';
import CampusFounderForm from './components/CampusFounderForm';
import FounderDashboard from './components/FounderDashboard'; // Notun Import
import { createClient } from '../utils/supabase/client'; 

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="text-2xl font-bold text-orange-600 animate-pulse">Loading GMate...</div>
        </div>
      ) : (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/join-founder" element={<CampusFounderForm />} />

          {/* Auth Routes */}
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard" /> : <SignupPage setUser={setUser} />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <LoginPage setUser={setUser} />} 
          />

          {/* Regular Student Dashboard */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} 
          />

          {/* CAMPUS FOUNDER DASHBOARD ROUTE */}
          <Route 
            path="/founder-dashboard" 
            element={user ? <FounderDashboard /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/privilege-card" 
            element={user ? <PrivilegeCard user={user} /> : <Navigate to="/login" />} 
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}