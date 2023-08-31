package handlers;

import strategy.FastestRoute;
import strategy.SafestRoute;
import vehicles.Vehicles;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

public class Menu {
    List<Vehicles> allVehiclesCreated = new ArrayList<>();
    public void showMenu() {
        int userChoice = 0;
        String menu = """
                ----- LOGISTICS PANEL -----
                1. Assign vehicles
                2. Assign routes
                3. Show all vehicles
                4. Exit""";

        while (userChoice != 4) {
            String optionChosen = JOptionPane.showInputDialog(null, menu + "\nChoose a option: ");

            try {
                userChoice = Integer.parseInt(optionChosen);
                switch (userChoice) {
                    case 1 -> {
                        InputHandler inputHandler = new InputHandler();
                        Vehicles vehicleCreatedByFactory = inputHandler.handleInputs();
                        allVehiclesCreated.add(vehicleCreatedByFactory);
                    }
                    case 2 -> {
                        for (Vehicles vehicle : allVehiclesCreated) {
                            String userChosenRoute = JOptionPane.showInputDialog("Input the route strategy for " + vehicle.getNome() + " :\n[SAFE/FAST]").toUpperCase();
                            if (userChosenRoute.equals("SAFE")) {
                                vehicle.setRouteStrategy(new FastestRoute());
                            } else {
                                vehicle.setRouteStrategy(new SafestRoute());
                            }
                        }
                    }
                    case 3 -> ListBuilder.showVehicleInfo(allVehiclesCreated);
                    case 4 -> JOptionPane.showMessageDialog(null, "Shutting down. Have a nice day!");
                }
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(null, "Invalid Option. Double check your parameters!", "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}
