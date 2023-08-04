// Ler 3 valores (A, B e C) representando as medidas dos lados de um triângulo e escrever se formam ou não um triângulo.
// A<B+C / B<A+C / C<A+B
import java.util.Scanner;

public class Main{
    public static void main(String[] args){
        int A,B,C;
        Scanner read = new Scanner(System.in);
        
        System.out.print("Please input the first measure: ");
        A = read.nextInt();
        
        System.out.print("Please input the second measure: ");
        B = read.nextInt();
        
        System.out.print("Please input the third measure: ");
        C = read.nextInt();
        
        if(A<(B+C) && B<(A+C) && C<(A+B)){
            System.out.print("The measures you input correlate to a triangle.");
        }else{
            System.out.print("The measures you input doesn't correlate to a triangle: ");
        }
    }
}