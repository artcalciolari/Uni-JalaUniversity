import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);
        byte userInput;

        System.out.println(" Welcome. Choose your desired option: ");
        System.out.println("""
                1. CALCULATE BOTH AREA AND PERIMETER OF A RECTANGLE
                2. CALCULATE BOTH AREA AND PERIMETER OF A TRIANGLE
                3. CALCULATE BOTH AREA AND PERIMETER OF A CIRCLE
                4. CALCULATE BOTH AREA AND PERIMETER OF A SQUARE
                5. EXIT
                ↓\
                """);

        userInput = read.nextByte();

        try {
            switch (userInput) {
                case 1 -> {
                    System.out.println("Insert the length of the base: ");
                    double rb = read.nextDouble();

                    System.out.println("Insert the height: ");
                    double rh = read.nextDouble();

                    Rectangle rectangle = new Rectangle(rb,rh);
                    double RArea = rectangle.calcularArea();
                    double Rperimeter = rectangle.calcularPerimetro();
                    System.out.println("The area of the Rectangle is: " + RArea + " and it's perimeter is: " + Rperimeter);
                }
                case 2 -> {
                    System.out.println("Insert the length of the first side: ");
                    double ts1 = read.nextDouble();

                    System.out.println("Insert the second side: ");
                    double ts2 = read.nextDouble();

                    System.out.println("Insert the third side: ");
                    double ts3 = read.nextDouble();

                    if (ts1 == ts2 && ts2 == ts3) {
                        EquilateralTriangle equitriangle = new EquilateralTriangle(ts1,ts2,ts3);
                        double EquiArea = equitriangle.calcularArea();
                        double EquiPerimeter = equitriangle.calcularPerimetro();

                        System.out.println("The area of the Equilateral Triangle is: " + EquiArea + " and it's perimeter is: " + EquiPerimeter);
                    } else if (ts1 == ts2 || ts1 == ts3 || ts2 == ts3) {
                        ScaleneTriangle scaleneTriangle = new ScaleneTriangle(ts1,ts2,ts3);
                        double ScaleneArea = scaleneTriangle.calcularArea();
                        double ScalenePerimeter = scaleneTriangle.calcularPerimetro();

                        System.out.println("The area of the Scalene Triangle is: " + ScaleneArea + " and it's perimeter is: " + ScalenePerimeter);
                    } else {
                        IsoscelesTriangle isoscelesTriangle = new IsoscelesTriangle(ts1,ts2,ts3);
                        double IsoscArea = isoscelesTriangle.calcularArea();
                        double IsoscPerimeter = isoscelesTriangle.calcularPerimetro();
                        System.out.println("The area of the Isosceles Triangle is: " + IsoscArea + " and it's perimeter is: " + IsoscPerimeter);
                    }
                }
                case 3 -> {
                    System.out.println("Insert the radius of the circle: ");
                    double radius = read.nextDouble();
                    Circle circle = new Circle(radius);

                    double CArea = circle.calcularArea();
                    double CPerimeter = circle.calcularPerimetro();
                    System.out.println("The area of the Circle is: " + CArea + " and it's perimeter is: " + CPerimeter);
                }
                case 4 -> {
                    System.out.println("Insert the length of the side: ");
                    double Ss1 = read.nextDouble();

                    Square square = new Square(Ss1);
                    double SArea = square.calcularArea();
                    double SPerimeter = square.calcularPerimetro();
                    System.out.println("The area of the Square is: " + SArea + " and it's perimeter is: " + SPerimeter);
                }
            }
            if (userInput > 5){
                System.out.println("Input the right options. Numbers 1-5");
            }
        }
            catch (Exception e) {
                System.out.println("Something went wrong when inputting the data. Try again.");
        }
    }
}
