import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import GuestBookingFlow from './pages/GuestBookingFlow';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import DashboardOverview from './pages/DashboardOverview';
import RoomManagement from './pages/RoomManagement';
import BookingManagement from './pages/BookingManagement';
import NewBookingForm from './pages/NewBookingForm';
import FrontDeskOperations from './pages/FrontDeskOperations';
import GuestDirectory from './pages/GuestDirectory';
import ReportsView from './pages/ReportsView';
import { ExternalLink, BedDouble } from 'lucide-react';
import './styles/dashboard.css';

export const App = () => {
  const { isAuthenticated, loading } = useAuth();

  // Route state initialized from browser URL
  const getInitialPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);
  const [currentView, setCurrentView] = useState('dashboard');
  const [navParams, setNavParams] = useState({});

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  };

  const handleStaffNavigate = (viewId, params = {}) => {
    setNavParams(params);
    setCurrentView(viewId);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAF7F1',
          color: '#342321',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
        }}
      >
        Loading Hotel Lara Reservation Console...
      </div>
    );
  }

  // Determine current routing context
  const isAdminLoginPath = currentPath === '/admin/login';
  const isAdminPath = currentPath.startsWith('/admin');

  // 1. Admin Login View (/admin/login)
  if (isAdminLoginPath && !isAuthenticated) {
    return (
      <Login
        onLoginSuccess={() => navigateTo('/admin')}
        onBackToGuest={() => navigateTo('/')}
      />
    );
  }

  // 2. Staff Admin Console View (/admin)
  if (isAdminPath) {
    if (!isAuthenticated) {
      // Unauthenticated access to /admin redirects to /admin/login
      return (
        <Login
          onLoginSuccess={() => navigateTo('/admin')}
          onBackToGuest={() => navigateTo('/')}
        />
      );
    }

    const viewTitles = {
      dashboard: 'Reception Overview & KPI Glance',
      'front-desk': 'Front Desk Check-in & Departure Turnover',
      rooms: '14 Physical Rooms Inventory',
      bookings: 'Reservations & Booking Register',
      'new-booking': 'New Offline Reservation',
      guests: 'Guest Profiles & Stays History',
      reports: 'Management Reports & Revenue Analytics',
    };

    return (
      <div className="dashboard-layout">
        <Sidebar currentView={currentView} onViewChange={handleStaffNavigate} />

        <div className="main-wrapper">
          <header className="topbar">
            <div className="topbar-title">
              <h2>{viewTitles[currentView] || 'Staff Console'}</h2>
              <span>Hotel Lara International — Internal Reception Desk</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <button
                onClick={() => navigateTo('/')}
                className="btn btn-burgundy btn-sm"
                title="Open Guest Room-Selection View"
              >
                <BedDouble size={14} />
                Guest Booking View
              </button>

              <a
                href={import.meta.env.VITE_PUBLIC_WEBSITE_URL || 'http://localhost:3000'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                title="Open Public Hotel Website"
              >
                <ExternalLink size={14} />
                Public Website
              </a>
            </div>
          </header>

          <main className="content-body">
            {currentView === 'dashboard' && <DashboardOverview onNavigate={handleStaffNavigate} />}
            {currentView === 'front-desk' && (
              <FrontDeskOperations
                targetBookingId={navParams.targetBookingId}
                onSelectBooking={handleStaffNavigate}
              />
            )}
            {currentView === 'rooms' && <RoomManagement />}
            {currentView === 'bookings' && (
              <BookingManagement
                onNewBooking={() => handleStaffNavigate('new-booking')}
                initialSelectedBookingId={navParams.bookingId}
              />
            )}
            {currentView === 'new-booking' && (
              <NewBookingForm
                onBookingCreated={(newBooking) =>
                  handleStaffNavigate('bookings', { bookingId: newBooking.id })
                }
                onCancel={() => handleStaffNavigate('bookings')}
              />
            )}
            {currentView === 'guests' && <GuestDirectory />}
            {currentView === 'reports' && <ReportsView />}
          </main>
        </div>
      </div>
    );
  }

  // 3. Guest View (Default route: /)
  return (
    <GuestBookingFlow
      onStaffPortalClick={() => {
        if (isAuthenticated) {
          navigateTo('/admin');
        } else {
          navigateTo('/admin/login');
        }
      }}
    />
  );
};

export default App;
