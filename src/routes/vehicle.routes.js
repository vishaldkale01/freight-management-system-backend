const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/Driver/vehileController');

// Get all vehicles
router.get('/', vehicleController.getAllVehicles);

// Get a single vehicles by ID
router.get('/:vehicleId', vehicleController.getVehicleById);

// Create a new vehicles
router.post('/', vehicleController.createVehicle);

// Update a vehicles by ID
router.put('/:vehicleId', vehicleController.updateVehicleById);

// Delete a vehicles by ID
router.delete('/:vehicleId', vehicleController.deleteVehicleById);

module.exports = router;
