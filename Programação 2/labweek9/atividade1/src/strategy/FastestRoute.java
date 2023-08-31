package strategy;

public class FastestRoute implements RouteStrategy{

    @Override
    public String toString() {
        double totalTime = TimeCoefficient.getTIME_COEFFICIENT() * 1.4;
        return "Using the safest route available. ETA: " + totalTime + " minutes.";
    }
}
