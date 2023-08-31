package factory;

import vehicles.Car;
import vehicles.Motorcycle;
import vehicles.Truck;
import vehicles.Vehicles;

public class MyVehicleFactory implements VehicleFactory {
    @Override
    public Vehicles createVehicle(int maximumCapacity, int maximumSpeed) {
        if (maximumCapacity == 1000 || maximumSpeed == 80) {
            return new Truck();
        } else if (maximumCapacity == 300 || maximumSpeed == 110) {
            return new Car();
        } else {
            return new Motorcycle();
        }
    }
}

