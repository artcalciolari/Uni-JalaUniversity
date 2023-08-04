//Ler dois valores (considere que não serão lidos valores iguais) e escrever o maior deles.
import java.util.*;

public class main{
    public static void main(String[] args){
        int firstNumber;
        int secondNumber;
        Scanner read = new Scanner(System.in);
        System.out.print("Please input the first number:");
        firstNumber = read.nextInt();
        
        System.out.print("Please input the second number:");
        secondNumber = read.nextInt();
        
        List list = Arrays.asList(firstNumber, secondNumber);
        
        if(firstNumber == secondNumber){
            System.out.print("The number you input was equal to the other one. Please try again.");
        }
        
        else{
            System.out.println(list);
            System.out.println("max: " + Collections.max(list));
        }
    }
}