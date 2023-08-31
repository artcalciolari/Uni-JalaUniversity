package strategy;

public class SafestRoute implements RouteStrategy{

    @Override
    public String toString() {
        double totalTime = TimeCoefficient.getTIME_COEFFICIENT() * 2;
        return "Using the safest route available. ETA: " + totalTime + " minutes.";
    }
}
