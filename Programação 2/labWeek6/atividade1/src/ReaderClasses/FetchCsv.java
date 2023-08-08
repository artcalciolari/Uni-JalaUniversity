package readerClasses;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

public class FetchCsv {

    public Map<String, String> fetchThenAdd(String filePath) {

        DecimalFormat format = new DecimalFormat("#.##");
        Map<String, String> regionsAverage = new HashMap<>();
        String line = "";

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            while ((line = br.readLine()) != null) {
                String[] data = line.split(";");
                String region = data[0];
                double sum = 0.0;
                int count = 0;
                for (int i = 1; i < data.length; i++) {
                    sum += Double.parseDouble(data[i]);
                    count++;
                }

                double average = sum / count;
                String formattedAverage = format.format(average);
                regionsAverage.put(region, formattedAverage);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return regionsAverage;
    }
}
