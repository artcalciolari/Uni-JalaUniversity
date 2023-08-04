//Ler dois valores e imprimir uma das três mensagens a seguir: ‘Números iguais’
//Caso os números sejam iguais ‘Primeiro é maior’, caso o primeiro seja maior que o segundo; ‘Segundo maior’, caso o segundo seja maior que o primeiro.
import java.util.Scanner;

public class main{
    public static void main(String[] args){
        int firstNumber, secondNumber;
        Scanner read = new Scanner(System.in);
        
        System.out.print("Please, input the first number: ");
        firstNumber = read.nextInt();
        
        System.out.print("Please, input the second number: ");
        secondNumber = read.nextInt();
        
        if(firstNumber == secondNumber){
            System.out.print("You input the number "+firstNumber+" twice.");
        }else if(firstNumber > secondNumber){
            System.out.print("The first number: "+firstNumber+" is greater then the second one: "+secondNumber);
        }else{
            System.out.print("The second number: "+secondNumber+" is greater then the first one: "+firstNumber);
        }
    }   
}