//Leia um vetor de 16 posições e troque os 8 primeiros valores pelos 8 últimos e vice-e-versa.
// Escreva ao final o vetor obtido.
import java.util.Arrays;
import  java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int[] array = new int[16];
        int auxArray;
        Scanner read = new Scanner(System.in);

        for (int i = 0; i < 16; i++) {
            System.out.println("Insert the numbers you desire: ");
            array[i] = read.nextInt();
        }

        for (int j = 0; j < 8; j++) {
            auxArray = array[j];
            array[j] = array[15 - j];
            array[15 - j] = auxArray;
        }
            System.out.println("The final array is: "+Arrays.toString(array));
    }
}
