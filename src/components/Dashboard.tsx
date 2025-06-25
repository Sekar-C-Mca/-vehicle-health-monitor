import React, { useState, useEffect, useCallback } from 'react';
import { VehicleData } from '../types/vehicle';
import { vehicleApi } from '../services/vehicleApi';
import { VehicleTable } from './VehicleTable';
import { StatusBadge } from './StatusBadge';
import { Search, RefreshCw, Activity, TrendingUp, AlertTriangle, CheckCircle, Database, Home, Wifi } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: 'home' | 'dashboard') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [form, setForm] = useState({
    vehicleId: '',
    temperature: '',
    vibration: '',
    aiStatus: 'Normal'
  });
  const [adding, setAdding] = useState(false);

  const fetchData = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await vehicleApi.getAllVehicleData(search);
      setVehicleData(response.data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      setError('Failed to fetch vehicle data from local storage.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData(searchTerm);
  }, [fetchData, searchTerm]);

  // Auto-refresh every 10 seconds (polling)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(searchTerm);
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchData, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleRefresh = () => {
    fetchData(searchTerm);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await vehicleApi.createVehicleData({
        vehicleId: form.vehicleId,
        temperature: Number(form.temperature),
        vibration: Number(form.vibration),
        aiStatus: form.aiStatus as 'Normal' | 'Warning' | 'Risk'
      });
      setForm({ vehicleId: '', temperature: '', vibration: '', aiStatus: 'Normal' });
      fetchData();
    } catch (err) {
      alert('Failed to add vehicle');
    } finally {
      setAdding(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: vehicleData.length,
    normal: vehicleData.filter(v => v.aiStatus === 'Normal').length,
    warning: vehicleData.filter(v => v.aiStatus === 'Warning').length,
    risk: vehicleData.filter(v => v.aiStatus === 'Risk').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('home')}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Vehicle Health Monitor</h1>
              <div className="ml-3 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="ml-2 text-sm text-gray-500">Live Mode</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Wifi className="w-4 h-4 mr-1" />
                <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Vehicle Form */}
        <form onSubmit={handleAddVehicle} className="mb-6 flex gap-4 items-end flex-wrap">
          <input
            name="vehicleId"
            value={form.vehicleId}
            onChange={handleFormChange}
            placeholder="Vehicle ID"
            required
            className="border p-2 rounded"
          />
          <input
            name="temperature"
            value={form.temperature}
            onChange={handleFormChange}
            placeholder="Temperature"
            type="number"
            required
            className="border p-2 rounded"
          />
          <input
            name="vibration"
            value={form.vibration}
            onChange={handleFormChange}
            placeholder="Vibration"
            type="number"
            required
            className="border p-2 rounded"
          />
          <select
            name="aiStatus"
            value={form.aiStatus}
            onChange={handleFormChange}
            className="border p-2 rounded"
          >
            <option value="Normal">Normal</option>
            <option value="Warning">Warning</option>
            <option value="Risk">Risk</option>
          </select>
          <button
            type="submit"
            disabled={adding}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {adding ? 'Adding...' : 'Add Vehicle'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Vehicles</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Normal Status</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.normal}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Warnings</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.warning}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">At Risk</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.risk}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by Vehicle ID..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <StatusBadge status="Normal" size="sm" />
                <StatusBadge status="Warning" size="sm" />
                <StatusBadge status="Risk" size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Data Table */}
        <VehicleTable data={vehicleData} loading={loading} />
      </div>
    </div>
  );
};