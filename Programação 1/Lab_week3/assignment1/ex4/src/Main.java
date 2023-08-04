import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int[] array = new int[20];
        int x;
        boolean control = false;
        Scanner read = new Scanner(System.in);

        for (int i = 0; i<20; i++){
            System.out.println("Insert the number: ");
            array[i] = read.nextInt();
        }
        System.out.println("Please insert the number you want to check: ");
        x = read.nextInt();
            for (int i = 0; i <array.length; i++) {
                if (array[i] == x) {
                    System.out.println("The value is present at the index of: " + i);
                    control = true;
                    break;
                }
        }
            if(!control) {
                System.out.println("The number is unavailable or out of range.");
            }
    }
}