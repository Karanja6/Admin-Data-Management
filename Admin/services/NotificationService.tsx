import React, { createContext, useContext, useEffect, useState } from 'react';

interface PushNotification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

interface NotificationContextType {
  notifications: PushNotification[];
  isSupported: boolean;
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  sendNotification: (notification: Omit<PushNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const isSupported = 'Notification' in window;

  useEffect(() => {
    if (isSupported) {
      setPermission(Notification.permission);
    }
  }, [isSupported]);

  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!isSupported) return 'denied';
    
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  const sendNotification = (notificationData: Omit<PushNotification, 'id' | 'timestamp' | 'read'>) => {
    const notification: PushNotification = {
      ...notificationData,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false
    };

    // Add to internal state
    setNotifications(prev => [notification, ...prev.slice(0, 49)]); // Keep last 50

    // Show browser notification if permission granted
    if (isSupported && permission === 'granted') {
      const browserNotif = new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || '/favicon.ico',
        badge: notification.badge || '/favicon.ico',
        tag: notification.tag,
        data: notification.data,
        actions: notification.actions,
        requireInteraction: notification.type === 'error' || notification.type === 'warning'
      });

      browserNotif.onclick = () => {
        window.focus();
        markAsRead(notification.id);
        browserNotif.close();
      };

      // Auto-close after 5 seconds for info notifications
      if (notification.type === 'info' || notification.type === 'success') {
        setTimeout(() => {
          browserNotif.close();
        }, 5000);
      }
    }

    // For mobile responsiveness, also trigger custom event
    window.dispatchEvent(new CustomEvent('heva-notification', {
      detail: notification
    }));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      isSupported,
      permission,
      requestPermission,
      sendNotification,
      markAsRead,
      clearAll,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Mobile notification toast component
export function MobileNotificationToast() {
  const [currentNotification, setCurrentNotification] = useState<PushNotification | null>(null);

  useEffect(() => {
    const handleNotification = (event: CustomEvent<PushNotification>) => {
      setCurrentNotification(event.detail);
      
      // Auto-hide after 4 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 4000);
    };

    window.addEventListener('heva-notification', handleNotification as EventListener);
    
    return () => {
      window.removeEventListener('heva-notification', handleNotification as EventListener);
    };
  }, []);

  if (!currentNotification) return null;

  const getToastStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'warning':
        return 'bg-orange-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 md:hidden">
      <div className={`rounded-lg p-4 shadow-lg max-w-sm transform transition-transform ${getToastStyle(currentNotification.type)}`}>
        <div className="flex items-start space-x-3">
          {currentNotification.icon && (
            <img src={currentNotification.icon} alt="" className="w-6 h-6 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium">{currentNotification.title}</p>
            <p className="text-sm opacity-90 mt-1">{currentNotification.body}</p>
          </div>
          <button
            onClick={() => setCurrentNotification(null)}
            className="text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}