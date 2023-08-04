//Escreva um algoritmo para ler 2 valores e se o segundo valor informado for ZERO, deve ser lido um novo valor
//imprimir o resultado da divisão do primeiro valor lido pelo segundo valor lido.
import java.util.Scanner;

public class Main{
    public static void main(String[] args){
        int a,b;
        double division;
        Scanner read = new Scanner(System.in);
        
        System.out.print("Please enter the first number: ");
        a = read.nextInt();
        
        System.out.print("Please enter the second number: ");
        b = read.nextInt();
        
        while(b == 0){
            System.out.print("The second number can't be zero, please input another one: ");
            b = read.nextInt();
        }
        division = a/b;
        System.out.print("The result is: "+division);
    }
}