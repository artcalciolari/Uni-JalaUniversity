package handlers;

import javax.swing.*;
import java.awt.*;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Menu {

    private final String filePath;
    private List<CovidData> covidDataList;
    private Map<String, Double> infectionRateIncreases;
    private Map<String, Double> mortalityRates;
    DecimalFormat decimalFormat = new DecimalFormat("#.##");

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
                2- Show most impacted neighborhood
                3- Add new record
                4- Save data to file
                5- Exit""";

        while (userChoice != 5) {
            String optionChosen = JOptionPane.showInputDialog(null, menu + "\nChoose a option:","Welcome!", JOptionPane.INFORMATION_MESSAGE);

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
                JOptionPane.showMessageDialog(null, "Invalid option. Please choose again.", "Error", JOptionPane.ERROR_MESSAGE);
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
            String district = data.cityName();
            double infectionRateIncrease = infectionRateIncreases.getOrDefault(district, 0.0);
            double mortalityRate = mortalityRates.getOrDefault(district, 0.0);

            statistics.append("District: ").append(district).append("\n");
            statistics.append("Infection Rate Increase: ").append(decimalFormat.format(infectionRateIncrease)).append("%").append("\n");
            statistics.append("Mortality Rate: ").append(decimalFormat.format(mortalityRate)).append("%").append("\n");
            statistics.append("------------------------\n");
        }
        //Create a scrollabe menu that will display the statistics
        JTextArea textArea = new JTextArea(statistics.toString());
        textArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(textArea);
        scrollPane.setPreferredSize(new Dimension(400, 300));

        JOptionPane.showMessageDialog(null, scrollPane, "Statistics", JOptionPane.INFORMATION_MESSAGE);
    }

    private void showMostImpactedNeighborhoods() {
        List<String> mostImpactedNeighborhoods = CalculateMostImpactedNeighborhoods.calculateImpact(covidDataList, infectionRateIncreases, mortalityRates);

        StringBuilder impactedNeighborhoods = new StringBuilder();
        for (String neighborhood : mostImpactedNeighborhoods) {
            impactedNeighborhoods.append("District: ").append(neighborhood).append("\n");
        }

        JTextArea textArea = new JTextArea(impactedNeighborhoods.toString());
        textArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(textArea);
        scrollPane.setPreferredSize(new Dimension(200, 100));

        JOptionPane.showMessageDialog(null, scrollPane, "Most impacted neighborhoods", JOptionPane.INFORMATION_MESSAGE);
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

        JOptionPane.showMessageDialog(null, "New record added successfully.", "Success!",JOptionPane.INFORMATION_MESSAGE);
    }

    private void saveCovidDataToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            for (CovidData data : covidDataList) {
                writer.write(data.cityName() + "," + data.covidCases() + "," + data.covidDeaths() + "," + data.timeOfSurvey());
                writer.newLine();
            }
            JOptionPane.showMessageDialog(null, "Data successfully saved to file!");
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error while saving the data to file.");
        }
    }
}

