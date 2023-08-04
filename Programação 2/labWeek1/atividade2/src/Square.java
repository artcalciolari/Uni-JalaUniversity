public class Square extends  GeometricForms {
    double lado1;

    public Square(double lado1) {
        this.lado1 = lado1;
    }

    @Override
    public double calcularArea() {
        return Math.pow(lado1,2);
    }

    @Override
    public double calcularPerimetro() {
        return lado1*4;
    }

}
