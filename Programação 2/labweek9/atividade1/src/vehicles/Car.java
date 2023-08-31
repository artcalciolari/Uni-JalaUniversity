package vehicles;

import strategy.RouteStrategy;

public class Car implements Vehicles {

    private RouteStrategy routeStrategy;
    @Override
    public int getMaximumCapacity() {
        return 300;
    }

    @Override
    public int getMaximumSpeed() {
        return 110;
    }

    @Override
    public String getNome() {
        return "Logistics car";
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
