import { Camera, Thermometer, Droplet, Activity, Zap, Wind } from 'lucide-react';
import { SensorReading } from '../utils/sensorData';

interface SensorCardProps {
  sensor: SensorReading;
}

const iconMap = {
  camera: Camera,
  thermometer: Thermometer,
  droplet: Droplet,
  activity: Activity,
  zap: Zap,
  wind: Wind
};

const statusColors = {
  normal: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  critical: 'bg-red-100 text-red-800 border-red-200'
};

export function SensorCard({ sensor }: SensorCardProps) {
  const Icon = iconMap[sensor.icon as keyof typeof iconMap] || Activity;
  const statusColor = statusColors[sensor.status];
  
  const displayValue = typeof sensor.value === 'number' 
    ? sensor.value.toFixed(1) 
    : sensor.value;
  
  return (
    <div className={`border rounded-lg p-4 transition-all hover:shadow-md ${statusColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{sensor.name}</p>
            <p className="text-2xl mt-1">
              {displayValue} {sensor.unit}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          sensor.status === 'normal' ? 'bg-green-500 text-white' :
          sensor.status === 'warning' ? 'bg-yellow-500 text-white' :
          'bg-red-500 text-white'
        }`}>
          {sensor.status.toUpperCase()}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Updated: {sensor.lastUpdated.toLocaleTimeString()}
      </p>
    </div>
  );
}
