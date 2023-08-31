package handlers;

import vehicles.Vehicles;

import javax.swing.*;
import java.awt.*;
import java.util.List;

class ListBuilder {
    protected static void showVehicleInfo(List<Vehicles> vehicles) {
        StringBuilder message = new StringBuilder();
        for (Vehicles vehicle : vehicles) {
            message.append("Vehicle Name: ").append(vehicle.getNome()).append("\n");
            message.append("Route Strategy: ").append(vehicle.getRouteStrategy()).append("\n");
            message.append("Maximum Cargo: ").append(vehicle.getMaximumSpeed()).append("\n");
            message.append("Maximum Speed: ").append(vehicle.getMaximumCapacity()).append("\n");
            message.append("------------------------\n");
        }

        JTextArea textArea = new JTextArea(message.toString());
        textArea.setEditable(false);

        JScrollPane scrollPane = new JScrollPane(textArea);
        scrollPane.setPreferredSize(new Dimension(400, 300));

        JOptionPane.showMessageDialog(null, scrollPane, "Vehicle Info", JOptionPane.INFORMATION_MESSAGE);
    }
}
