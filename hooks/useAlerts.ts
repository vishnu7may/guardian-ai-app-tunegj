
import { useState, useEffect } from 'react';
import { Alert } from '@/types/monitoring';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      cameraId: '1',
      type: 'crying',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      description: 'Baby crying detected',
      severity: 'high',
      isRead: false,
    },
    {
      id: '2',
      cameraId: '2',
      type: 'motion',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      description: 'Motion detected in living room',
      severity: 'medium',
      isRead: false,
    },
    {
      id: '3',
      cameraId: '1',
      type: 'sound',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      description: 'Unusual sound detected',
      severity: 'low',
      isRead: true,
    },
  ]);

  const unreadCount = alerts.filter(a => !a.isRead).length;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, isRead: true })));
  };

  const addAlert = (alert: Omit<Alert, 'id'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
    };
    setAlerts([newAlert, ...alerts]);
  };

  const clearAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addAlert,
    clearAlert,
  };
}
