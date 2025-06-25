require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Vehicle = require('./models/Vehicle');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working and connected to MongoDB!' });
});

// Get all vehicles
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ timestamp: -1 }).limit(100);
    res.json({ data: vehicles, total: vehicles.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new vehicle
app.post('/vehicles', async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a vehicle
app.put('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a vehicle
app.delete('/vehicles/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 