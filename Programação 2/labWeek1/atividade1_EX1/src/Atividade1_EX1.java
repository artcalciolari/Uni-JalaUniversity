import java.util.Scanner;

public class Atividade1_EX1 {
    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);
        int x, y;
        System.out.println("Insert X value: ");
        x = read.nextInt();
        System.out.println("Now, insert Y value: ");
        y = read.nextInt();

         if (x > 0){
            if (y > 0){
                System.out.println("The point ("+x+","+y+") is on the first quadrant");
            } else {
                System.out.println("The point ("+x+","+y+") is on the fourth quadrant");
            }
         }
         if (x < 0){
             if (y > 0){
                 System.out.println("The point ("+x+","+y+") is on the second quadrant");
             } else {
                 System.out.println("The point ("+x+","+y+") is on the third quadrant");
             }
         }
         else {
             System.out.println("The point ("+x+","+y+") is on the origin, or it's on the line");
         }
    }
}
