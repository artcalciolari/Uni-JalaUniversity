//As maçãs custam R$ 1,30 cada, se forem compradas menos de uma dúzia e R$ 1,00, se forem compradas pelo menos 12.
//Escreva um programa que leia o número de maçãs compradas, calcule e escreva o custo total da compra.
import java.util.Scanner;

public class ex2{
    public static void main(String[] args){
        int numApples;
        double totalAmount;
        try (Scanner read = new Scanner(System.in)){
        System.out.print("Please input the amount you purchased:");
        numApples = read.nextInt();
        }
        if(numApples <= 11){
            totalAmount = numApples * 1.30;
            System.out.println("Your total amount is: R$"+totalAmount);
        }else if(numApples >= 12){
            totalAmount = numApples;
            System.out.println("Your total amount is: R$"+totalAmount+" the 30 cent discount is already in effect.");
        }
    }
}