
export interface Camera {
  id: string;
  name: string;
  type: 'baby' | 'pet';
  location: string;
  isOnline: boolean;
  hasNightVision: boolean;
  hasTwoWayAudio: boolean;
  streamUrl?: string;
}

export interface Alert {
  id: string;
  cameraId: string;
  type: 'motion' | 'sound' | 'crying' | 'barking' | 'unusual';
  timestamp: Date;
  description: string;
  severity: 'low' | 'medium' | 'high';
  thumbnailUrl?: string;
  isRead: boolean;
}

export interface ActivityLog {
  id: string;
  cameraId: string;
  timestamp: Date;
  type: 'sleep' | 'awake' | 'movement' | 'sound' | 'feeding' | 'playing';
  duration?: number;
  notes?: string;
}

export interface DailyReport {
  date: Date;
  cameraId: string;
  totalSleepTime: number;
  totalActiveTime: number;
  alertsCount: number;
  highlights: string[];
  activityPattern: {
    hour: number;
    activity: number;
  }[];
}

export interface AlertZone {
  id: string;
  cameraId: string;
  name: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  enabled: boolean;
}
