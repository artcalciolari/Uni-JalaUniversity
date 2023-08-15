package handlers;

import javax.swing.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class FileHandler {

    protected List<CovidData> readFile(String filePath) {
        List<CovidData> dataFromFile = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                String cityName = parts[0];
                int covidCases = Integer.parseInt(parts[1]);
                int covidDeaths = Integer.parseInt(parts[2]);
                String dateOfSurvey = parts[3];

                CovidData cv = new CovidData(cityName, dateOfSurvey, covidCases, covidDeaths);
                dataFromFile.add(cv);
            }
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Something went wrong while reading the file.");
        }
        return dataFromFile;
    }
}
