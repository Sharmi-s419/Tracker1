import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import GuestRoomSelection from './pages/GuestRoomSelection';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import DashboardOverview from './pages/DashboardOverview';
import RoomManagement from './pages/RoomManagement';
import BookingManagement from './pages/BookingManagement';
import NewBookingForm from './pages/NewBookingForm';
import FrontDeskOperations from './pages/FrontDeskOperations';
import GuestDirectory from './pages/GuestDirectory';
import ReportsView from './pages/ReportsView';
import { ExternalLink, Clock, BedDouble, ShieldCheck } from 'lucide-react';
import './styles/dashboard.css';

export const App = () => {
  const { isAuthenticated, loading } = useAuth();
  const [viewMode, setViewMode] = useState('guest'); // 'guest' | 'staff'
  const [currentView, setCurrentView] = useState('dashboard');
  const [navParams, setNavParams] = useState({});

  const handleNavigate = (viewId, params = {}) => {
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
          fontFamily: 'sans-serif',
        }}
      >
        Loading Hotel Lara Room Portal...
      </div>
    );
  }

  // 1. Guest View (Public Room Selection Portal - Reference Image 3)
  if (viewMode === 'guest') {
    return (
      <GuestRoomSelection
        onStaffPortalClick={() => {
          if (isAuthenticated) {
            setViewMode('staff');
          } else {
            setViewMode('login');
          }
        }}
      />
    );
  }

  // 2. Staff Login Screen (When staff clicks "Staff Portal" while unauthenticated)
  if (viewMode === 'login' && !isAuthenticated) {
    return (
      <div>
        <div style={{ padding: '1rem', backgroundColor: '#FAF7F1', borderBottom: '1px solid #E6DDD3' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setViewMode('guest')}
          >
            ← Back to Guest Room Selection
          </button>
        </div>
        <Login onLoginSuccess={() => setViewMode('staff')} />
      </div>
    );
  }

  // 3. Staff Console View (Authenticated Reception Staff)
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
      <Sidebar currentView={currentView} onViewChange={handleNavigate} />

      <div className="main-wrapper">
        <header className="topbar">
          <div className="topbar-title">
            <h2>{viewTitles[currentView] || 'Staff Console'}</h2>
            <span>Hotel Lara International — Internal Staff Reception Portal</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              onClick={() => setViewMode('guest')}
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
          {currentView === 'dashboard' && <DashboardOverview onNavigate={handleNavigate} />}
          {currentView === 'front-desk' && (
            <FrontDeskOperations
              targetBookingId={navParams.targetBookingId}
              onSelectBooking={handleNavigate}
            />
          )}
          {currentView === 'rooms' && <RoomManagement />}
          {currentView === 'bookings' && (
            <BookingManagement
              onNewBooking={() => handleNavigate('new-booking')}
              initialSelectedBookingId={navParams.bookingId}
            />
          )}
          {currentView === 'new-booking' && (
            <NewBookingForm
              onBookingCreated={(newBooking) =>
                handleNavigate('bookings', { bookingId: newBooking.id })
              }
              onCancel={() => handleNavigate('bookings')}
            />
          )}
          {currentView === 'guests' && <GuestDirectory />}
          {currentView === 'reports' && <ReportsView />}
        </main>
      </div>
    </div>
  );
};

export default App;
