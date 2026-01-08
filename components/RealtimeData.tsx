import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateHistoricalData, generateSensorData, SensorReading } from '../utils/sensorData';

export function RealtimeData() {
  const [historicalData, setHistoricalData] = useState(generateHistoricalData(24));
  const [currentSensors, setCurrentSensors] = useState<SensorReading[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  
  useEffect(() => {
    // Update current readings every 3 seconds
    const updateReadings = () => {
      setCurrentSensors(generateSensorData());
    };
    
    updateReadings();
    const interval = setInterval(updateReadings, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Update historical data based on selected time range
    let hours = 24;
    if (selectedTimeRange === '1m') {
      hours = 1 / 60; // 1 minute = 1/60 hours
    } else if (selectedTimeRange === '6h') {
      hours = 6;
    } else if (selectedTimeRange === '12h') {
      hours = 12;
    } else if (selectedTimeRange === '24h') {
      hours = 24;
    }
    setHistoricalData(generateHistoricalData(hours));
  }, [selectedTimeRange]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl text-gray-900 mb-2">Real-time Sensor Data</h2>
        <p className="text-gray-600">Live monitoring and historical trends</p>
      </div>
      
      {/* Time Range Selector */}
      <div className="mb-6 flex gap-2">
        {['1m', '6h', '12h', '24h'].map((range) => (
          <button
            key={range}
            onClick={() => setSelectedTimeRange(range)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTimeRange === range
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Last {range}
          </button>
        ))}
      </div>
      
      {/* Temperature & Humidity Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-4">Temperature & Humidity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#ef4444"
              strokeWidth={2}
              name="Temperature (°C)"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Humidity (%)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Air Quality Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-4">Air Quality Index</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="airQuality"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              name="Air Quality Index"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Vibration Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg text-gray-900 mb-4">Vibration Sensor (IMU)</h3>
        <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            ⚠️ <strong>Alert:</strong> Irregular vibration patterns detected. See Maintenance page for details.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="vibration"
              stroke="#ef4444"
              strokeWidth={3}
              name="Vibration (g)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Current Readings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Current Sensor Readings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Sensor
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSensors.map((sensor) => (
                <tr key={sensor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sensor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof sensor.value === 'number' ? sensor.value.toFixed(2) : sensor.value} {sensor.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${
                      sensor.status === 'normal' ? 'bg-green-100 text-green-800' :
                      sensor.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sensor.lastUpdated.toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}