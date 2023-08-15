package handlers;

import javax.swing.*;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Menu {

    private List<CovidData> covidDataList;
    private Map<String, Double> infectionRateIncreases;
    private Map<String, Double> mortalityRates;
    private final String filePath;

    public Menu(String filePath) {
        this.filePath = filePath;
        covidDataList = new ArrayList<>();
        infectionRateIncreases = new HashMap<>();
        mortalityRates = new HashMap<>();
    }

    public void start() {
        loadCovidDataFromFile();
        int userChoice = 0;
        String menu = """
                ------- MENU --------
                1- Show statistics
                2- Show most impacted neighborhoods
                3- Add new record
                4- Save data to file
                5- Exit""";

        while (userChoice != 5) {
            String optionChosen = JOptionPane.showInputDialog(null, menu + "\nChoose a option:");

            try {
                userChoice = Integer.parseInt(optionChosen);

                switch (userChoice) {
                    case 1 -> showStatistics();
                    case 2 -> showMostImpactedNeighborhoods();
                    case 3 -> addNewRecord();
                    case 4 -> saveCovidDataToFile();
                    default -> JOptionPane.showMessageDialog(null, "Shutting down. Have a nice day! :)");
                }
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(null, "Invalid option. Please choose again.");
            }
        }
    }

    private void loadCovidDataFromFile() {
        FileHandler fileHandler = new FileHandler();
        try {
            covidDataList = fileHandler.readFile(filePath);
            infectionRateIncreases = CalculateInfectionRate.calculateInfectionRate(covidDataList);
            mortalityRates = CalculateMortalityRate.calculateMortalityRate(covidDataList);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error while reading the file.");
        }
    }

    private void showStatistics() {
        StringBuilder statistics = new StringBuilder();
        for (CovidData data : covidDataList) {
            String district = data.getCityName();
            double infectionRateIncrease = infectionRateIncreases.getOrDefault(district, 0.0);
            double mortalityRate = mortalityRates.getOrDefault(district, 0.0);

            statistics.append("District: ").append(district).append("\n");
            statistics.append("Infection Rate Increase: ").append(infectionRateIncrease).append("\n");
            statistics.append("Mortality Rate: ").append(mortalityRate).append("\n");
            statistics.append("------------------------\n");
        }

        JOptionPane.showMessageDialog(null, statistics.toString(), "Statistics", JOptionPane.INFORMATION_MESSAGE);
    }

    private void showMostImpactedNeighborhoods() {
        List<String> mostImpactedNeighborhoods = CalculateMostImpactedNeighborhoods.calculateImpact(covidDataList, infectionRateIncreases, mortalityRates);

        StringBuilder impactedNeighborhoods = new StringBuilder();
        for (String neighborhood : mostImpactedNeighborhoods) {
            impactedNeighborhoods.append(neighborhood).append("\n");
        }

        JOptionPane.showMessageDialog(null, "The most impacted neighborhood is: " + impactedNeighborhoods, "Most Impacted Neighborhoods", JOptionPane.INFORMATION_MESSAGE);
    }

    private void addNewRecord() {
        String district = JOptionPane.showInputDialog(null, "Enter the district name:");
        int cases = Integer.parseInt(JOptionPane.showInputDialog(null, "Enter the number of confirmed cases:"));
        int deaths = Integer.parseInt(JOptionPane.showInputDialog(null, "Enter the number of deaths:"));
        String date = JOptionPane.showInputDialog(null, "Enter the date of analysis:");

        CovidData newRecord = new CovidData(district, date, cases, deaths);
        covidDataList.add(newRecord);

        //Recalculate statistics
        infectionRateIncreases = CalculateInfectionRate.calculateInfectionRate(covidDataList);
        mortalityRates = CalculateMortalityRate.calculateMortalityRate(covidDataList);

        JOptionPane.showMessageDialog(null, "New record added successfully.");
    }

    private void saveCovidDataToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            for (CovidData data : covidDataList) {
                writer.write(data.getCityName() + "," + data.getCovidCases() + "," + data.getCovidDeaths() + "," + data.getTimeOfSurvey());
                writer.newLine();
            }
            JOptionPane.showMessageDialog(null, "Data successfully saved to file!");
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error while saving the data to file.");
        }
    }
}

