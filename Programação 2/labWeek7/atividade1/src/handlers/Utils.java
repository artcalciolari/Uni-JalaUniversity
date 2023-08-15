package handlers;

import javax.swing.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class Utils {

    protected static List<Distancia> readDistanciaFromFile(String filePath) {
        List<Distancia> distancias = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                String origem = parts[0];
                String destino = parts[1];
                double dist = Double.parseDouble(parts[2]);

                Distancia distancia = new Distancia(origem, destino, dist);
                distancias.add(distancia);
            }
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Something went wrong while reading the file.");
        }
        return distancias;
    }
}
