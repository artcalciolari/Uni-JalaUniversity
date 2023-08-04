// Faça um algoritmo para ler um número que é um código de usuário. 
// Caso este código seja diferente de um código armazenado internamente no algoritmo (igual a 1234) deve ser apresentada a mensagem ‘Usuário inválido!’. 
// Caso o Código seja correto, deve ser lido outro valor que é a senha. 
// Se esta senha estiver incorreta (a certa é 9999) deve ser mostrada a mensagem ‘senha incorreta’. 
// Caso a senha esteja correta, deve ser mostrada a mensagem ‘Acesso permitido’.
import java.util.Scanner;

public class main{
    public static void main(String[] args){
        int accountNumber = 1234, pin = 9999;
        int accNumberUser, pinUser;
        Scanner read = new Scanner(System.in);
        
        System.out.println("Please input your account number: ");
        accNumberUser = read.nextInt();
        System.out.println("Please input your security PIN: ");
        pinUser = read.nextInt();
        
        if(accNumberUser != accountNumber){
            System.out.println("The account number is incorrect. Try again.");
        }else if(pinUser != pin){
            System.out.println("The security PIN is incorrect. Try again.");
        }else if(accNumberUser == accountNumber && pinUser == pin){
            System.out.print("Login sucessful.");
        }
    }
}