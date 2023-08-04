import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int x;
        Scanner read = new Scanner(System.in);
        System.out.print("Input the number that you want to know the fibonacci sequence: ");
        x = read.nextInt();
        int seqResult = fibonacciSeq(x);
        System.out.println(seqResult);
    }
    public static int fibonacciSeq(int x){
        if(x == 0){
            return 0;
        }else if(x == 1){
            return 1;
        }else{
            return fibonacciSeq(x-1) + fibonacciSeq(x-2);
        }
    }
}