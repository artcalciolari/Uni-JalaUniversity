package vehicles;

import strategy.RouteStrategy;

public class Truck implements Vehicles {

    private RouteStrategy routeStrategy;
    @Override
    public int getMaximumCapacity() {
        return 1000;
    }

    @Override
    public int getMaximumSpeed() {
        return 80;
    }

    @Override
    public String getNome() {
        return "Logistics truck";
    }

    @Override
    public void setRouteStrategy(RouteStrategy routeStrategy) {
        this.routeStrategy = routeStrategy;
    }

    @Override
    public RouteStrategy getRouteStrategy() {
        return routeStrategy;
    }

}