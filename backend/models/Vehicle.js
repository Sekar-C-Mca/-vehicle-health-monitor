const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleId: String,
  temperature: Number,
  vibration: Number,
  aiStatus: { type: String, enum: ['Normal', 'Warning', 'Risk'] },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', vehicleSchema); 