import { useState } from 'react';
import { maintenanceTips, MaintenanceTip } from '../utils/sensorData';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function MaintenanceTips() {
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const filteredTips = maintenanceTips.filter(tip => {
    const priorityMatch = selectedPriority === 'all' || tip.priority === selectedPriority;
    const typeMatch = selectedType === 'all' || tip.sensorType === selectedType;
    return priorityMatch && typeMatch;
  });
  
  const sensorTypes = ['all', ...new Set(maintenanceTips.map(tip => tip.sensorType))];
  
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };
  
  const priorityIcons = {
    low: CheckCircle,
    medium: Clock,
    high: AlertCircle
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl text-gray-900 mb-2">Maintenance Tips & Guidelines</h2>
        <p className="text-gray-600">Keep your sensor system running optimally</p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Filter by Priority</label>
            <div className="flex gap-2">
              {['all', 'low', 'medium', 'high'].map((priority) => (
                <button
                  key={priority}
                  onClick={() => setSelectedPriority(priority)}
                  className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                    selectedPriority === priority
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-2">Filter by Sensor Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sensorTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Sensors' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => {
          const Icon = priorityIcons[tip.priority];
          const colorClass = priorityColors[tip.priority];
          
          return (
            <div key={tip.id} className={`border rounded-lg p-6 ${colorClass} transition-all hover:shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider">
                    {tip.priority} Priority
                  </span>
                </div>
                <span className="text-xs bg-white px-2 py-1 rounded-full">
                  {tip.frequency}
                </span>
              </div>
              
              <h3 className="text-lg mb-2">{tip.title}</h3>
              <p className="text-sm opacity-90 mb-3">{tip.description}</p>
              
              <div className="pt-3 border-t border-current opacity-50">
                <p className="text-xs">Sensor: {tip.sensorType}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredTips.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-500">No maintenance tips match your current filters.</p>
        </div>
      )}
      
      {/* General Guidelines */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl text-blue-900 mb-4">General Maintenance Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900">Keep sensors clean and dust-free</p>
                <p className="text-blue-700 text-xs mt-1">Regular cleaning prevents false readings</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900">Monitor battery levels</p>
                <p className="text-blue-700 text-xs mt-1">Replace batteries before they're depleted</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900">Check WiFi connectivity regularly</p>
                <p className="text-blue-700 text-xs mt-1">Ensure stable data transmission</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900">Update firmware when available</p>
                <p className="text-blue-700 text-xs mt-1">Stay current with security patches</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900">Document all maintenance activities</p>
                <p className="text-blue-700 text-xs mt-1">Keep a log for reference</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900">Test sensors after maintenance</p>
                <p className="text-blue-700 text-xs mt-1">Verify proper operation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
