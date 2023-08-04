//Leia uma matriz 4 x 4 e escreva a localização (linha e a coluna) do maior valor.
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int biggerRow = 0, biggerColumn = 0;
        int max = Integer.MIN_VALUE;
        Scanner read = new Scanner(System.in);
        int[][] array = new int[4][4];

        System.out.print("Insert the values of a 4x4 matrix(about 16 numbers): ");
        for(int i=0; i<array.length; i++){
            for(int j=0; j<array.length;j++){
                array[i][j] = read.nextInt();
                if(array[i][j] > max){
                    max = array[i][j];
                    biggerRow = i;
                    biggerColumn = j;
                }
            }
        }
        for(int i =0;i< array.length; i++){
            for(int j=0; j< array.length;j++){
                System.out.print(array[i][j]+" ");
            }
            System.out.println();
        }
        System.out.println("The biggest number is: "+max+" and is located at the row: "+(biggerRow+1)+" and the column: "+(biggerColumn+1));
    }
}