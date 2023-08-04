//Declare uma matriz 5 x 5.
// Faça com que o computador preencha com 1 a diagonal principal e com 0 os demais elementos.
// Escreva ao final a matriz obtida.
public class Main {
    public static void main(String[]args){
        int[][] array = new int[5][5];

        for (int i = 0; i <array.length; i++) {
            for (int j = 0; j < array.length; j++) {
                if(i == j){
                    array[i][j] = 1;
                }else{
                   array[i][j] = 0;
                }
            }
        }

        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array.length; j++) {
                System.out.print(array[i][j]+"\t");
            }
            System.out.println();
        }
    }
}
