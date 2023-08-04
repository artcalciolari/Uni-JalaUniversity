//Ler o ano atual e o ano de nascimento de uma pessoa. 
//Escrever uma mensagem que diga se ela poderá ou não votar este ano.
import java.util.Scanner;

public class ex3{
    public static void main(String[] args){
        int age;
        try (Scanner read = new Scanner(System.in)){
        System.out.print("Please input your age: ");
        age = read.nextInt();
        }
        if(age < 18){
            System.out.print("You aren't old enough to vote. Sorry.");
        }else if(age >= 18){
            System.out.print("You are old enough to vote if you wish.");
        }
    }
}