package vehicles;

import strategy.RouteStrategy;

public class Motorcycle implements Vehicles {

    private RouteStrategy routeStrategy;

    @Override
    public int getMaximumCapacity() {
        return 100;
    }

    @Override
    public int getMaximumSpeed() {
        return 150;
    }

    @Override
    public String getNome() {
        return "Logistics motorcycle";
    }

    @Override
    public RouteStrategy getRouteStrategy() {
        return routeStrategy;
    }

    @Override
    public void setRouteStrategy(RouteStrategy routeStrategy) {
        this.routeStrategy = routeStrategy;
    }
}
