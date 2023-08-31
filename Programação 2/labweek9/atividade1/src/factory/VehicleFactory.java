package factory;

import vehicles.Vehicles;

interface VehicleFactory {

    // capacity in kgs and speed in km/h
    Vehicles createVehicle(int maximumCapacity, int maximumSpeed);
}

