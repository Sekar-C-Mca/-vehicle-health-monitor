export interface VehicleData {
  _id: string;
  vehicleId: string;
  temperature: number;
  vibration: number;
  aiStatus: 'Normal' | 'Warning' | 'Risk';
  timestamp: Date;
}

export interface VehicleApiResponse {
  data: VehicleData[];
  total: number;
}