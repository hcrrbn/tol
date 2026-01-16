
import React, { useState, useEffect } from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };

  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-rose-500',
    info: 'bg-primary-500'
  };

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-3 px-6 py-3 rounded-full text-white shadow-2xl animate-in slide-in-from-bottom-10 ${colors[type]}`}>
      <i className={`fas ${icons[type]} text-lg`}></i>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast;
