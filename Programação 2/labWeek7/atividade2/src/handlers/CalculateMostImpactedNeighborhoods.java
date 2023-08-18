package handlers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class CalculateMostImpactedNeighborhoods {

    protected static List<String> calculateImpact(List<CovidData> covidDataList, Map<String, Double> infectionRateIncreases, Map<String, Double> mortalityRates) {
        List<String> mostImpacted = new ArrayList<>();
        double biggestInfectionRate = 0.0;
        double biggestMortalityRate = 0.0;

        for (CovidData districtData : covidDataList) {
            String district = districtData.cityName();
            double infectionRateIncreasesOrDefault = infectionRateIncreases.getOrDefault(district, 0.0);
            double mortalityRatesOrDefault = mortalityRates.getOrDefault(district, 0.0);

            if (infectionRateIncreasesOrDefault > biggestInfectionRate) {
                biggestInfectionRate = infectionRateIncreasesOrDefault;
                if (mostImpacted.contains(district)) {
                    continue;
                }
                mostImpacted.add(district);
            } else if (infectionRateIncreasesOrDefault == biggestInfectionRate) {
                mostImpacted.add(district);
            }

            if (mortalityRatesOrDefault > biggestMortalityRate) {
                biggestMortalityRate = mortalityRatesOrDefault;
                if (mostImpacted.contains(district)) {
                    continue;
                }
                mostImpacted.add(district);
            } else if (mortalityRatesOrDefault == biggestMortalityRate) {
                mostImpacted.add(district);
            }
        }

        return mostImpacted;
    }
}