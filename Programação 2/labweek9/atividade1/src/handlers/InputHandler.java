package handlers;

import factory.MyVehicleFactory;
import vehicles.Vehicles;

import javax.swing.*;

class InputHandler {

    MyVehicleFactory factory = new MyVehicleFactory();

    protected Vehicles handleInputs() {
        String userInput = JOptionPane.showInputDialog("Input the desired speed and cargo:" +
                "\nTo choose a car, input: 110, 300\n" +
                "To choose a truck, input: 80, 1000\n" +
                "To choose a motorcycle, input: 150, 100");

        String[] inputValues = userInput.split(",");
        if (inputValues.length == 2) {
            String speedInput = inputValues[0].trim();
            String cargoInput = inputValues[1].trim();

            int speed = Integer.parseInt(speedInput);
            int cargo = Integer.parseInt(cargoInput);

            return factory.createVehicle(cargo, speed);
        } else {
            JOptionPane.showMessageDialog(null, "Invalid input format. Please enter speed and cargo separated by a comma.", "Bad Inputs", JOptionPane.ERROR_MESSAGE);
            return null;
        }
    }
}

