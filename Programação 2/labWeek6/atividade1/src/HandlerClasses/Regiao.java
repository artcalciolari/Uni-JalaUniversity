package handlerClasses;

import readerClasses.FetchCsv;

import javax.swing.*;
import java.util.Map;

public class Regiao {

    private final String filePath;

    public Regiao(String filePath) {
        this.filePath = filePath;
    }

    public void fetchCsv() {
        FetchCsv fetch = new FetchCsv();
        Map<String, String> regionsAverage = fetch.fetchThenAdd(filePath);
        printResults(regionsAverage);
    }

    private void printResults(Map<String, String> regionsAverage) {
        for (Map.Entry<String, String> entry : regionsAverage.entrySet()) {
            String region = entry.getKey();
            String average = entry.getValue();

            JOptionPane.showMessageDialog(null,"Region: "+region+"\nAverage: "+average);
        }
    }
}
