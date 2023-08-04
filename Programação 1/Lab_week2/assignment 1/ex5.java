//Faça um algoritmo para ler: número da conta do cliente, saldo, débito e crédito. 
//Após, calcular e escrever o saldo atual (saldo atual = saldo - débito + crédito).
//Também testar se saldo atual for maior ou igual a zero escrever a mensagem 'Saldo Positivo', senão escrever a mensagem 'Saldo Negativo'.
import java.util.Scanner;

public class main{
    public static void main(String[] args){
        int newBalance;
        int accountNumber;
        int debt, credit, balance;
        Scanner read = new Scanner(System.in);
        
        System.out.print("Please input your account number: ");
        accountNumber = read.nextInt();
        
        System.out.print("Please input your balance ammount: ");
        balance = read.nextInt();
        
        System.out.print("Please input your credit: ");
        credit = read.nextInt();
        
        System.out.print("Please input your debt: ");
        debt = read.nextInt();
        
        newBalance = balance - debt + credit;
        
        if(newBalance > 0){
            System.out.print("Your balance is positive and has a value of: R$"+newBalance);
        }else if(newBalance <0){
            System.out.print("Your balance is negative and has a value of: R$"+newBalance);
        }
    }
}