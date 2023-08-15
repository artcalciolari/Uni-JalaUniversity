package handlers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

class CalculateMortalityRate {

    protected static Map<String, Double> calculateMortalityRate (List<CovidData> covidDataList) {
        Map<String, Double> mortalityRates = new HashMap<>();
        for (CovidData data : covidDataList) {
            double mortalityRate = (double) data.getCovidDeaths() / data.getCovidCases();
            mortalityRates.put(data.getCityName(), mortalityRate);
        }
        return mortalityRates;
    }
}
