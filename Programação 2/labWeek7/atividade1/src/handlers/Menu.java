package handlers;

import javax.swing.*;
import java.util.Comparator;
import java.util.List;

public class Menu {

    private final String filePath = JOptionPane.showInputDialog("Insert the file path:");
    List<Distancia> distancias = Utils.readDistanciaFromFile(filePath);

    public void showMenu() {
        int userChoice = 0;
        String menu = """
                ------- MENU --------
                1- Show every distance
                2- Five odd distances
                3- Ascending order
                4- Descending order
                5- EXIT""";

        while (userChoice != 5) {
            String optionChosen = JOptionPane.showInputDialog(null, menu + "\nChoose a option:");

            try {
                userChoice = Integer.parseInt(optionChosen);

                switch (userChoice) {
                    case 1 -> {
                        StringBuilder simpleOutput = new StringBuilder();
                        distancias.forEach(distancia -> simpleOutput.append(distancia).append("\n"));
                        JOptionPane.showMessageDialog(null, simpleOutput.toString());
                    }
                    case 2 -> {
                        List<Distancia> oddDistancias = distancias.stream()
                                .filter(distancia -> distancia.getDist() % 2 != 0)
                                .limit(5)
                                .toList();
                        StringBuilder oddOutput = new StringBuilder();
                        oddDistancias.forEach(distancia -> oddOutput.append(distancia).append("\n"));
                        JOptionPane.showMessageDialog(null, oddOutput.toString());
                    }
                    case 3 -> {
                        List<Distancia> ascendingDistancias = distancias.stream()
                                .sorted(Comparator.comparingDouble(Distancia::getDist))
                                .toList();
                        StringBuilder ascendingOutput = new StringBuilder();
                        ascendingDistancias.forEach(distancia -> ascendingOutput.append(distancia).append("\n"));
                        JOptionPane.showMessageDialog(null, ascendingOutput.toString());
                    }
                    case 4 -> {
                        List<Distancia> descendingDistancias = distancias.stream()
                                .sorted(Comparator.comparingDouble(Distancia::getDist).reversed())
                                .toList();
                        StringBuilder descendingOutput = new StringBuilder();
                        descendingDistancias.forEach(distancia -> descendingOutput.append(distancia).append("\n"));
                        JOptionPane.showMessageDialog(null, descendingOutput.toString());
                    }
                    default -> JOptionPane.showMessageDialog(null, "Shutting down. Have a nice day! B)");
                }
            } catch (Exception e) {
                JOptionPane.showMessageDialog(null, "Something went wrong while printing results.");
            }
        }
    }
}
