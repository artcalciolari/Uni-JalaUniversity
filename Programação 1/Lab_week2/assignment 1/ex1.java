//Ler um valor e escrever se é positivo, negativo ou zero.
import java.util.Scanner;

public class ex1{
    public static void main(String[] args){
        int number;
        try (Scanner read = new Scanner(System.in)) {
            System.out.print("Please, input a number: ");
            number = read.nextInt();
        }
        if (number > 0){
            System.out.print("The number "+number+" is positive");
        }else if(number == 0){
            System.out.print("The number is zero");
        }else{
            System.out.print("The number "+number+" is negative" );
        }
    }
}