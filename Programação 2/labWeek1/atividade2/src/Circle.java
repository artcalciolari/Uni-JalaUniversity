public class Circle extends GeometricForms {
    double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double calcularArea() {
        return Math.PI*(Math.pow(radius,2));
    }
    @Override
    public double calcularPerimetro() {
        return 2*(Math.PI*radius);
    }
}
