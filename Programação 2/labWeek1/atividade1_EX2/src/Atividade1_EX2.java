import java.text.DecimalFormat;
import java.util.Scanner;

public class Atividade1_EX2 {
    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);
        DecimalFormat format = new DecimalFormat("#,###");
        int x;
        System.out.println("Insert your number: ");
        x = read.nextInt();

        int factorialDigit = factorialFinalDigit(x);
        int factorialResult = factorialCalc(x);
        String formattedFactResult = format.format(factorialResult);

        System.out.println("The factorial of the number "+x+" is: "+formattedFactResult);
        System.out.println("The last digit of your number in factorial form is: " +factorialDigit);
    }
    public static int factorialFinalDigit(int x) {
        if(x == 0) {
            return 0;
        } else {
            int factorial = 1;
            for (int i = 1; i <= x; i++) {
                factorial *= i;
                factorial %= 10; // Keep only the last digit
            }
            return factorial;
        }
    }
    public static int factorialCalc(int x) {
        if(x == 0) {
            return 0;
        }else if(x == 1) {
            return 1;
        }else {
            return x * factorialCalc(x-1);
        }
    }
}
