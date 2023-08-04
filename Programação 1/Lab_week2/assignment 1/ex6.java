//Ler 3 valores (considere que não serão informados valores iguais) e escrever a soma dos 2 maiores.
import java.util.Scanner;

public class Main {

   public static void main(String[] args) {
       Scanner read = new Scanner(System.in);
       int a, b, c, biggerNumber1, biggerNumber2;

       System.out.print("Input the first number: ");
       a = read.nextInt();

       System.out.print("Input the second number: ");
       b = read.nextInt();

       System.out.print("Input the third number: ");
       c = read.nextInt();

       if (a > b && a > c){
           biggerNumber1 = a;
           if (b > c){
               biggerNumber2 = b;
           } else{
               biggerNumber2 = c;
           }

       }else if(b > a && b > c){
           biggerNumber1 = b;
           if(a > c){
               biggerNumber2 = a;
           } else{
               biggerNumber2 = c;
           }

       } else{
           biggerNumber1 = c;
           if (a > b){
               biggerNumber2 = a;
           } else{
               biggerNumber2 = b;
           }
        
       }
    System.out.println("The sum of the two biggest numbers is: " +(biggerNumber1 + biggerNumber2));
   }
    
}