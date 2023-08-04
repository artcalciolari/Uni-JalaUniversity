// Ler 10 valores e escrever quantos desses valores lidos são NEGATIVOS. Utilize a estrutura de repetição que te agradar.
import java.util.Scanner;

public class main{
    public static void main(String[] args){
        Scanner read = new Scanner(System.in);
        int num_negativo = 0;
        int count = 0;
        while(count<10){
            System.out.print("Please, input the number: ");
            if(read.nextDouble() < 0){
                num_negativo++;}
            count++;
        } System.out.print("The amount of negative numbers are: "+num_negativo);
    }
    
}