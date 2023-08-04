import java.util.Scanner;
public class Main {
    public static double toThePower(int x, int n){
        double resultPower;
        resultPower = Math.pow(x,n);
        return resultPower;
    }
    public static double Delta(int a, int b, int c){
        double resultDelta;
        resultDelta = toThePower(b,2) - (4*a*c);
        return resultDelta;
    }
    public static void main(String[] args) {
        int userChoice;
        double resultPower;
        double resultDelta;
        int x, n;
        int a, b, c;
        Scanner read = new Scanner(System.in);
        System.out.println("Welcome! this program will help you to calculate x^n, and the value of Δ");
        System.out.println("Please, choose a option: 1 [CALCULATE X^N] or 2 [CALCULATE DELTA]");
        userChoice = read.nextInt();
        if (userChoice == 1) {
            System.out.println("Please insert the values of X and N.");
            System.out.println("Please, insert the X value: ");
            x = read.nextInt();
            System.out.println("Please insert the N value: ");
            n = read.nextInt();
            resultPower = toThePower(x, n);
            System.out.println("The result of " +x+ " to the power of " +n+ " is: " + resultPower);
        } else if (userChoice == 2) {
            System.out.println("Now, insert the values of A,B and C.");
            System.out.println("Please, insert the value of A: ");
            a = read.nextInt();
            System.out.println("Please, insert the value of B: ");
            b = read.nextInt();
            System.out.println("Please, insert the value of C: ");
            c = read.nextInt();
            resultDelta = Delta(a, b, c);
            System.out.println("The result of Delta is: " + resultDelta);
        } else {
            System.out.println("This is not a valid option. Try again.");
        }
    }
}