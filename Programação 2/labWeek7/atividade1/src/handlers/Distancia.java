package handlers;

import java.util.Objects;

class Distancia implements Comparable<Distancia> {

    private final String origem;
    private final String destino;
    private final double dist;

    public Distancia(String origem, String destino, double dist) {
        this.origem = origem;
        this.destino = destino;
        this.dist = dist;
    }

    protected double getDist() {
        return dist;
    }

    @Override
    public int compareTo(Distancia outraDistancia) {
        return Double.compare(this.dist, outraDistancia.getDist());
    }

    @Override
    public String toString() {
        return "Distancia {" +
                "origem = '" + origem + '\'' +
                ", destino = '" + destino + '\'' +
                ", dist = " + dist +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Distancia distancia = (Distancia) o;
        return Double.compare(distancia.dist, dist) == 0 &&
                Objects.equals(origem, distancia.origem) &&
                Objects.equals(destino, distancia.destino);
    }

    @Override
    public int hashCode() {
        return Objects.hash(origem, destino, dist);
    }
}