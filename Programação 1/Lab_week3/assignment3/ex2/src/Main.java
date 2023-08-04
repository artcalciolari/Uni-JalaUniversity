import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int x,y;
        int option, result;
        Scanner read = new Scanner(System.in);
//        program start
        System.out.println("Welcome to your free calculator! What do you want to do?");
        System.out.println("1. Add some numbers");
        System.out.println("2. Subtract some numbers");
        System.out.println("3. Multiply some numbers");
        System.out.println("4. Divide some numbers");
        System.out.println("5. EXIT");
        System.out.print("Input your desired option: ");
        option = read.nextInt();
        switch (option){
            case 1:
                System.out.println("Insert the X value: ");
                x = read.nextInt();
                System.out.println("Insert the Y value: ");
                y = read.nextInt();
                result = x+y;
                System.out.println("The result of the sum is: "+result);
                break;
            case 2:
                System.out.println("Insert the X value: ");
                x = read.nextInt();
                System.out.println("Insert the Y value: ");
                y = read.nextInt();
                result = x-y;
                System.out.println("The result of subtraction is: "+result);
                break;
            case 3:
                System.out.println("Insert the X value: ");
                x = read.nextInt();
                System.out.println("Insert the Y value: ");
                y = read.nextInt();
                result = x*y;
                System.out.println("The result of multiplication is: "+result);
                break;
            case 4:
                System.out.println("Insert the X value: ");
                x = read.nextInt();
                System.out.println("Insert the Y value: ");
                y = read.nextInt();
                result = (x/y);
                System.out.println("The result of division is: "+result);
                break;
            case 5:
                System.out.println("The program is shutting down, have a nice day.");
                break;
            default:
                System.out.println("Invalid option, please try again.");
                break;
        }
    }
}