import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
       int numImpar = 0;
       int [] array = new int[10];
       Scanner read = new Scanner(System.in);

       for (int i=0;i<10;i++){
           System.out.println("Insert the numbers you desire: ");
           array[i] = read.nextInt();
       }

       for(int j=0; j<array.length;j++){
           if(array[j]%2!=0) {
               System.out.print(array[j]+"/");
               numImpar++;
           }
        }
        System.out.println();
        System.out.println("The total of odd numbers is: "+numImpar+".");

    }
}