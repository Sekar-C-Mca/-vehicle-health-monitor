import { VehicleData, VehicleApiResponse } from '../types/vehicle';

const API_BASE = 'http://localhost:5000';

export const vehicleApi = {
  async getAllVehicleData(vehicleId?: string): Promise<VehicleApiResponse> {
    const url = vehicleId ? `${API_BASE}/vehicles?vehicleId=${vehicleId}` : `${API_BASE}/vehicles`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch vehicle data');
    return res.json();
  },

  async createVehicleData(data: Omit<VehicleData, '_id' | 'timestamp'>): Promise<VehicleData> {
    const res = await fetch(`${API_BASE}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create vehicle data');
    return res.json();
  },

  async updateVehicleData(id: string, data: Partial<VehicleData>): Promise<VehicleData> {
    const res = await fetch(`${API_BASE}/vehicles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update vehicle data');
    return res.json();
  },

  async deleteVehicleData(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/vehicles/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete vehicle data');
  }
};