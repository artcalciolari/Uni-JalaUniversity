package handlers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

class CalculateInfectionRate {

    protected static Map<String, Double> calculateInfectionRate(List<CovidData> covidDataList) {
        Map<String, Double> infectionRateIncreases = new HashMap<>();
        for (int i = 1; i < covidDataList.size(); i++) {
            CovidData previousData = covidDataList.get(i - 1);
            CovidData currentData = covidDataList.get(i);

            double infectionRateIncrease = (currentData.covidCases() - (double) previousData.covidCases() / previousData.covidCases() * 100);
            infectionRateIncreases.put(currentData.cityName(), infectionRateIncrease);
        }
        return infectionRateIncreases;
    }
}
