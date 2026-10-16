import React from 'react';
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  PlusCircle,
  Users,
  LogOut,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RotatingLogo from './RotatingLogo';

export const Sidebar = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'front-desk', label: 'Front Desk & Turn', icon: CheckCircle2 },
    { id: 'rooms', label: '14 Rooms Inventory', icon: BedDouble },
    { id: 'bookings', label: 'Bookings List', icon: CalendarDays },
    { id: 'new-booking', label: 'New Reservation', icon: PlusCircle },
    { id: 'guests', label: 'Guest Profiles', icon: Users },
    { id: 'reports', label: 'Management Reports', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo" style={{ background: 'transparent', padding: 0, overflow: 'visible' }}>
          <RotatingLogo size={36} speed={24} theme="gold" idPrefix="sidebar" />
        </div>
        <div className="sidebar-title">
          <h1>HOTEL LARA</h1>
          <p>Reception Console</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Front Desk Operations</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge">
          <div className="user-info">
            <div className="user-avatar">
              {(user?.first_name?.[0] || user?.username?.[0] || 'S').toUpperCase()}
            </div>
            <div className="user-details">
              <h4>{user?.first_name || user?.username || 'Staff'}</h4>
              <p>{user?.role || (user?.is_staff ? 'Front Desk Staff' : 'Reception')}</p>
            </div>
          </div>
          <button
            className="btn-logout"
            onClick={logout}
            title="Log Out"
            aria-label="Log out"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
