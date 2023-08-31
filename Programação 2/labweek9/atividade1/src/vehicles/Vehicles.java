package vehicles;

import strategy.RouteStrategy;

public interface Vehicles {

    int getMaximumCapacity();
    int getMaximumSpeed();
    String getNome();
    void setRouteStrategy(RouteStrategy routeStrategy);
    RouteStrategy getRouteStrategy();
}
