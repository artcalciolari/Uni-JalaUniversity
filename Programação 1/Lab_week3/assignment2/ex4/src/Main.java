//Crie um programa que leia uma matriz 4 x 4 e conte quantos números pares a matriz contém e mostre a quantidade.
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int count=0;
        Scanner read = new Scanner(System.in);
        int[][] array = new int[4][4];
        System.out.println("Insert the values(for a 4x4 matrix you should input about 16 numbers.)");
        for(int i=0;i< array.length;i++)
            for(int j=0;j< array.length; j++){
                array[i][j] = read.nextInt();
                if(array[i][j] %2 == 0){
                    count++;
                }
        }
        for(int i =0;i< array.length;i++){
            for(int j=0;j< array.length;j++){
                System.out.print(array[i][j]+" ");
            }
            System.out.println();
        }
        System.out.println("The amount of even numbers are: "+count);
    }
}