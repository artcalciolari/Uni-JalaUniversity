public class Triangle extends GeometricForms {
    double lado1,lado2,lado3;

    public Triangle(double lado1, double lado2, double lado3) {
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.lado3 = lado3;
    }

    @Override
    public double calcularArea() {
        return  (lado1*lado2)/2;
    }

    @Override
    public double calcularPerimetro() {
        return lado1+lado2+lado3;
    }
}
