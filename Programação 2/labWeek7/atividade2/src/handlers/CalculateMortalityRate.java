package handlers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

class CalculateMortalityRate {

    protected static Map<String, Double> calculateMortalityRate (List<CovidData> covidDataList) {
        Map<String, Double> mortalityRates = new HashMap<>();
        for (CovidData data : covidDataList) {
            double mortalityRate = ((double) data.covidDeaths() / data.covidCases() * 100);
            mortalityRates.put(data.cityName(), mortalityRate);
        }
        return mortalityRates;
    }
}
