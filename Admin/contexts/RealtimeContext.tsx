import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface RealtimeData {
  applications: any[];
  reports: any[];
  notifications: any[];
  entrepreneurs: any[];
  analytics: {
    totalEntrepreneurs: number;
    pendingApplications: number;
    fundsDisbursed: number;
    successRate: number;
    monthlyGrowth: number;
    regionStats: any[];
    industryStats: any[];
    realtimeMetrics: any[];
  };
}

interface RealtimeContextType {
  data: RealtimeData;
  isConnected: boolean;
  subscribe: (channel: string, callback: (data: any) => void) => () => void;
  updateData: (type: string, payload: any) => void;
  sendNotification: (notification: any) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [subscribers, setSubscribers] = useState<Map<string, ((data: any) => void)[]>>(new Map());
  const [data, setData] = useState<RealtimeData>({
    applications: [],
    reports: [],
    notifications: [],
    entrepreneurs: [],
    analytics: {
      totalEntrepreneurs: 247,
      pendingApplications: 13,
      fundsDisbursed: 2100000,
      successRate: 87,
      monthlyGrowth: 12,
      regionStats: [
        { region: 'Nairobi', count: 89, funding: 1200000, growth: 15 },
        { region: 'Mombasa', count: 45, funding: 650000, growth: 8 },
        { region: 'Kisumu', count: 38, funding: 520000, growth: 22 },
        { region: 'Nakuru', count: 32, funding: 480000, growth: 18 }
      ],
      industryStats: [
        { industry: 'Manufacturing', count: 86, funding: 1200000, avgSuccess: 89 },
        { industry: 'Technology', count: 62, funding: 980000, avgSuccess: 92 },
        { industry: 'Agriculture', count: 49, funding: 750000, avgSuccess: 85 },
        { industry: 'Services', count: 37, funding: 520000, avgSuccess: 81 }
      ],
      realtimeMetrics: []
    }
  });

  // Simulate real-time connection
  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 1000);

    return () => clearTimeout(connectTimer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      // Simulate random data updates
      const now = new Date();
      const newMetric = {
        timestamp: now.toISOString(),
        activeUsers: Math.floor(Math.random() * 50) + 150,
        newApplications: Math.floor(Math.random() * 5),
        fundingRequests: Math.floor(Math.random() * 3),
        communityPosts: Math.floor(Math.random() * 8)
      };

      setData(prevData => ({
        ...prevData,
        analytics: {
          ...prevData.analytics,
          realtimeMetrics: [
            ...prevData.analytics.realtimeMetrics.slice(-29), // Keep last 30 points
            newMetric
          ]
        }
      }));

      // Notify subscribers
      const channelSubs = subscribers.get('analytics');
      if (channelSubs) {
        channelSubs.forEach(callback => callback(newMetric));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isConnected, subscribers]);

  const subscribe = useCallback((channel: string, callback: (data: any) => void) => {
    setSubscribers(prev => {
      const newMap = new Map(prev);
      const channelSubs = newMap.get(channel) || [];
      newMap.set(channel, [...channelSubs, callback]);
      return newMap;
    });

    // Return unsubscribe function
    return () => {
      setSubscribers(prev => {
        const newMap = new Map(prev);
        const channelSubs = newMap.get(channel) || [];
        const filteredSubs = channelSubs.filter(cb => cb !== callback);
        if (filteredSubs.length === 0) {
          newMap.delete(channel);
        } else {
          newMap.set(channel, filteredSubs);
        }
        return newMap;
      });
    };
  }, []);

  const updateData = useCallback((type: string, payload: any) => {
    setData(prevData => {
      const newData = { ...prevData };
      
      switch (type) {
        case 'application_status':
          // Update application status and notify subscribers
          const appSubs = subscribers.get('applications');
          if (appSubs) {
            appSubs.forEach(callback => callback({ type: 'status_change', ...payload }));
          }
          break;
        
        case 'new_report':
          // Add new report and notify subscribers
          const reportSubs = subscribers.get('reports');
          if (reportSubs) {
            reportSubs.forEach(callback => callback({ type: 'new_report', ...payload }));
          }
          break;
        
        case 'funding_update':
          // Update funding data
          newData.analytics = {
            ...newData.analytics,
            fundsDisbursed: newData.analytics.fundsDisbursed + payload.amount
          };
          break;
      }
      
      return newData;
    });
  }, [subscribers]);

  const sendNotification = useCallback((notification: any) => {
    // Add to notifications and notify subscribers
    setData(prevData => ({
      ...prevData,
      notifications: [notification, ...prevData.notifications]
    }));

    const notifSubs = subscribers.get('notifications');
    if (notifSubs) {
      notifSubs.forEach(callback => callback(notification));
    }
  }, [subscribers]);

  return (
    <RealtimeContext.Provider value={{
      data,
      isConnected,
      subscribe,
      updateData,
      sendNotification
    }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}