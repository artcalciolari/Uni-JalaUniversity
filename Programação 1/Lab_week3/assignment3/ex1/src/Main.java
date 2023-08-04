import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int x;
        Scanner read = new Scanner(System.in);

        System.out.println("Insert the number that you want to know: ");
        x= read.nextInt();
        switch (x){
            case 1:
                System.out.println("The way you write 1 is: one.");
                break;
            case 2:
                System.out.println("The way you write 2 is: two.");
                break;
            case 3:
                System.out.println("The way you write 3 is: three.");
                break;
            case 4:
                System.out.println("The way you write 4 is: four.");
                break;
            case 5:
                System.out.println("The way you write 5 is: five.");
                break;
            case 6:
                System.out.println("The way you write 6 is: six.");
                break;
            case 7:
                System.out.println("The way you write 7 is: seven.");
                break;
            case 8:
                System.out.println("The way you 8 is: eight.");
                break;
            case 9:
                System.out.println("The way you write 9 is: nine.");
                break;
            case 10:
                System.out.println("The way you write 10 is: ten.");
                break;
        }
    }
}