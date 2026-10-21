import React from 'react';

export const StatusBadge = ({ status, type = 'booking' }) => {
  const normStatus = (status || '').toLowerCase();

  const labels = {
    available: 'Available',
    occupied: 'Occupied',
    cleaning: 'Cleaning',
    maintenance: 'Maintenance',
    confirmed: 'Confirmed',
    checked_in: 'Checked-In',
    checked_out: 'Checked-Out',
    cancelled: 'Cancelled',
    paid: 'Paid',
    pending: 'Pending',
    partial: 'Advance Paid',
    refunded: 'Refunded',
  };

  const getClassName = () => {
    switch (normStatus) {
      case 'available':
        return 'badge badge-available';
      case 'occupied':
        return 'badge badge-occupied';
      case 'cleaning':
        return 'badge badge-cleaning';
      case 'maintenance':
        return 'badge badge-maintenance';
      case 'confirmed':
        return 'badge badge-confirmed';
      case 'checked_in':
        return 'badge badge-checkedin';
      case 'checked_out':
        return 'badge badge-checkedout';
      case 'cancelled':
        return 'badge badge-cancelled';
      case 'paid':
        return 'badge badge-available';
      case 'partial':
        return 'badge badge-cleaning';
      case 'pending':
        return 'badge badge-cancelled';
      default:
        return 'badge';
    }
  };

  return (
    <span className={getClassName()}>
      {labels[normStatus] || status}
    </span>
  );
};

export default StatusBadge;
