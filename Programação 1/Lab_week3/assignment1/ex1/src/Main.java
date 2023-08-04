import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int[] array = new int[12];
        int x,y;
        Scanner read = new Scanner(System.in);

        for(int i=0;i<12;i++){
            System.out.println("Insert the number you desire: ");
            array[i] = read.nextInt();
        }
        System.out.println("Insert the first number:");
        x = read.nextInt();
        System.out.println("Insert the second number:");
        y = read.nextInt();
        if(!(x>=0 && x<=12) || (!(y>=0 && y<=12))){
            System.out.println("Invalid position for x or y");
            System.exit(0);
        }
        System.out.println("The sum is: "+(array[x]+array[y]));
    }
}