import { useState, useEffect } from 'react';
import { SensorCard } from './SensorCard';
import { generateSensorData, SensorReading } from '../utils/sensorData';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export function Dashboard() {
  const [sensors, setSensors] = useState<SensorReading[]>([]);
  const [stats, setStats] = useState({ normal: 0, warning: 0, critical: 0 });
  
  useEffect(() => {
    // Initial load
    const data = generateSensorData();
    setSensors(data);
    updateStats(data);
    
    // Update every 5 seconds
    const interval = setInterval(() => {
      const newData = generateSensorData();
      setSensors(newData);
      updateStats(newData);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const updateStats = (data: SensorReading[]) => {
    const stats = {
      normal: data.filter(s => s.status === 'normal').length,
      warning: data.filter(s => s.status === 'warning').length,
      critical: data.filter(s => s.status === 'critical').length
    };
    setStats(stats);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl text-gray-900 mb-2">System Overview</h2>
        <p className="text-gray-600">Real-time monitoring of all household sensors</p>
      </div>
      
      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Normal</p>
              <p className="text-3xl text-gray-900 mt-1">{stats.normal}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Warning</p>
              <p className="text-3xl text-gray-900 mt-1">{stats.warning}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Critical</p>
              <p className="text-3xl text-gray-900 mt-1">{stats.critical}</p>
            </div>
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
        </div>
      </div>
      
      {/* Sensor Grid */}
      <div>
        <h3 className="text-xl text-gray-900 mb-4">All Sensors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.map(sensor => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </div>
      
      {/* System Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg text-blue-900 mb-2">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-blue-700">Core Module</p>
            <p className="text-blue-900">ESP32</p>
          </div>
          <div>
            <p className="text-blue-700">Connection</p>
            <p className="text-blue-900">WiFi + BLE</p>
          </div>
          <div>
            <p className="text-blue-700">Active Sensors</p>
            <p className="text-blue-900">{sensors.length} modules</p>
          </div>
        </div>
      </div>
    </div>
  );
}
