export interface SensorReading {
  id: string;
  name: string;
  type: 'core' | 'air' | 'water' | 'movement' | 'electrical';
  value: number | string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: Date;
  icon: string;
}

export interface MaintenanceTip {
  id: string;
  sensorType: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  frequency: string;
}

// Mock sensor data generator
export const generateSensorData = (): SensorReading[] => {
  return [
    {
      id: 'core-1',
      name: 'ESP32',
      type: 'core',
      value: 'Connected',
      unit: '',
      status: 'normal',
      lastUpdated: new Date(),
      icon: 'camera'
    },
    {
      id: 'air-temp',
      name: 'Temperature',
      type: 'air',
      value: 22 + Math.random() * 3,
      unit: '°C',
      status: 'normal',
      lastUpdated: new Date(),
      icon: 'thermometer'
    },
    {
      id: 'air-humidity',
      name: 'Humidity',
      type: 'air',
      value: 45 + Math.random() * 10,
      unit: '%',
      status: 'normal',
      lastUpdated: new Date(),
      icon: 'droplet'
    },
    {
      id: 'air-quality',
      name: 'Air Quality',
      type: 'air',
      value: Math.floor(50 + Math.random() * 100),
      unit: 'AQI',
      status: Math.random() > 0.7 ? 'warning' : 'normal',
      lastUpdated: new Date(),
      icon: 'wind'
    },
    {
      id: 'water-1',
      name: 'Water Continuity',
      type: 'water',
      value: Math.random() > 0.9 ? 'Leak Detected' : 'No Leaks',
      unit: '',
      status: Math.random() > 0.9 ? 'critical' : 'normal',
      lastUpdated: new Date(),
      icon: 'droplet'
    },
    {
      id: 'movement-1',
      name: 'Vibration Sensor',
      type: 'movement',
      value: Math.random() * 0.5,
      unit: 'g',
      status: 'normal',
      lastUpdated: new Date(),
      icon: 'activity'
    },
    {
      id: 'electrical-1',
      name: 'Breaker Panel',
      type: 'electrical',
      value: Math.random() > 0.95 ? 'Anomaly' : 'Normal',
      unit: '',
      status: Math.random() > 0.95 ? 'warning' : 'normal',
      lastUpdated: new Date(),
      icon: 'zap'
    }
  ];
};

// Historical data for charts
export const generateHistoricalData = (hours: number = 24) => {
  const data = [];
  const now = Date.now();
  
  // For 1 minute, generate data every second (60 data points)
  // For other ranges, generate data every hour
  const isOneMinute = hours < 0.1; // Less than 6 minutes
  const intervalMs = isOneMinute ? 1000 : 60 * 60 * 1000; // 1 second or 1 hour
  const totalPoints = isOneMinute ? 60 : Math.floor(hours) + 1;
  
  for (let i = totalPoints - 1; i >= 0; i--) {
    const timestamp = new Date(now - i * intervalMs);
    
    // Create realistic vibration pattern with high values, dips, and a peak
    // Peak happens around 40% through the timeline
    const progress = (totalPoints - 1 - i) / (totalPoints - 1);
    let vibration;
    
    if (progress < 0.15) {
      // Start with high values with occasional dips
      vibration = 0.8 + Math.random() * 0.5;
      if (Math.random() > 0.75) {
        vibration = 0.2 + Math.random() * 0.2; // Clear dip
      }
    } else if (progress >= 0.15 && progress < 0.35) {
      // Building up to peak with high values
      vibration = 0.9 + (progress - 0.15) / 0.2 * 0.7 + Math.random() * 0.3;
      if (Math.random() > 0.8) {
        vibration = 0.3 + Math.random() * 0.2; // Occasional dip
      }
    } else if (progress >= 0.35 && progress < 0.45) {
      // PEAK - sharp spike with very high values
      const peakIntensity = 2.0 + Math.random() * 0.6; // Peak between 2.0-2.6g
      vibration = peakIntensity;
    } else if (progress >= 0.45 && progress < 0.55) {
      // After peak - still high with some dips
      vibration = 1.2 + Math.random() * 0.4;
      if (Math.random() > 0.65) {
        vibration = 0.4 + Math.random() * 0.3; // Clear dip
      }
    } else if (progress >= 0.55 && progress < 0.75) {
      // High values with dips
      vibration = 0.9 + Math.random() * 0.5;
      if (Math.random() > 0.6) {
        vibration = 0.25 + Math.random() * 0.25; // Dip
      }
    } else {
      // End with high values and occasional dips
      vibration = 0.8 + Math.random() * 0.6;
      if (Math.random() > 0.7) {
        vibration = 0.2 + Math.random() * 0.3; // Dip
      }
    }
    
    // Add some noise to make it more realistic
    vibration += (Math.random() - 0.5) * 0.1;
    vibration = Math.max(0.1, vibration); // Ensure minimum value
    
    // Format time based on interval
    const timeFormat = isOneMinute 
      ? timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      : timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    data.push({
      time: timeFormat,
      temperature: 20 + Math.random() * 5,
      humidity: 40 + Math.random() * 20,
      airQuality: 50 + Math.random() * 100,
      vibration: Math.max(0, vibration) // Ensure non-negative
    });
  }
  
  return data;
};

// Maintenance tips
export const maintenanceTips: MaintenanceTip[] = [
  {
    id: 'tip-vibration-alert',
    sensorType: 'Movement Sensor',
    title: 'High Vibrations Detected',
    description: 'The IMU sensor is detecting irregular vibration patterns that exceed normal operating thresholds. This could indicate structural issues, loose equipment, or nearby construction activity. Immediate inspection is recommended to identify and address the vibration source before potential damage occurs.',
    priority: 'high',
    frequency: 'Immediate Action Required'
  },
  {
    id: 'tip-1',
    sensorType: 'Camera',
    title: 'Clean Camera Lens',
    description: 'Regularly clean the cameera lens to ensure clear image capture. Use a microfiber cloth and avoid touching the lens directly.',
    priority: 'medium',
    frequency: 'Monthly'
  },
  {
    id: 'tip-2',
    sensorType: 'Air Monitor',
    title: 'Calibrate Air Quality Sensor',
    description: 'Air quality sensors should be calibrated every 6 months for accurate readings. Place the sensor in a known clean environment for calibration.',
    priority: 'high',
    frequency: 'Every 6 months'
  },
  {
    id: 'tip-3',
    sensorType: 'Air Monitor',
    title: 'Replace Humidity Sensor Filter',
    description: 'The humidity sensor has a protective filter that should be replaced annually to maintain accuracy.',
    priority: 'medium',
    frequency: 'Annually'
  },
  {
    id: 'tip-4',
    sensorType: 'Water Monitor',
    title: 'Test Water Sensor',
    description: 'Perform a manual test of the water continuity sensor monthly by applying a small amount of water to verify detection works properly.',
    priority: 'high',
    frequency: 'Monthly'
  },
  {
    id: 'tip-5',
    sensorType: 'Water Monitor',
    title: 'Check Sensor Placement',
    description: 'Ensure water sensors are positioned in areas prone to leaks (under sinks, near water heaters, etc.) and are not obstructed.',
    priority: 'medium',
    frequency: 'Quarterly'
  },
  {
    id: 'tip-6',
    sensorType: 'Movement Sensor',
    title: 'Secure IMU Mounting',
    description: 'Check that the IMU sensor is securely mounted and hasn\'t loosened over time. Loose mounting can cause false vibration readings.',
    priority: 'medium',
    frequency: 'Quarterly'
  },
  {
    id: 'tip-7',
    sensorType: 'Electrical Sensor',
    title: 'Microphone Positioning',
    description: 'Ensure the microphone is positioned close to the breaker panel but away from direct interference. Check for any physical damage.',
    priority: 'high',
    frequency: 'Quarterly'
  },
  {
    id: 'tip-8',
    sensorType: 'Core Module',
    title: 'Update Software',
    description: 'Keep the sensor software up to date to ensure security and optimal performance. You will get a notification when updates are available',
    priority: 'high',
    frequency: 'Monthly'
  },
  {
    id: 'tip-9',
    sensorType: 'Core Module',
    title: 'Check WiFi Connection',
    description: 'Verify the WiFi signal strength to the ESP32. Weak signals can cause data transmission delays or failures.',
    priority: 'medium',
    frequency: 'Weekly'
  },
  {
    id: 'tip-10',
    sensorType: 'All Sensors',
    title: 'Battery Backup Check',
    description: 'If using battery backup for sensors, check battery levels and replace batteries that are below 20% capacity.',
    priority: 'high',
    frequency: 'Monthly'
  },
  {
    id: 'tip-11',
    sensorType: 'Electrical Sensor',
    title: 'Review Sound Patterns',
    description: 'Listen to recordings from the breaker panel microphone weekly to familiarize yourself with normal operation sounds.',
    priority: 'low',
    frequency: 'Weekly'
  },
  {
    id: 'tip-12',
    sensorType: 'All Sensors',
    title: 'Data Backup',
    description: 'Regularly backup sensor data and configurations. Store backups in a secure, off-site location.',
    priority: 'high',
    frequency: 'Weekly'
  }
];