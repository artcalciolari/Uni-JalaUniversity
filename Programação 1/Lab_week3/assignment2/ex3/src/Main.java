import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);
        int count = 0;
        int[][] array = new int[6][6];
        System.out.println("Insert the values(for a 6x6 matrix you should input about 36 numbers.)");

        for(int i=0;i<array.length;i++){
            for(int j=0; j<array.length;j++){
                array[i][j] = read.nextInt();
                if(array[i][j] > 10){
                    count++;
                }
            }
        }
        for(int i =0;i< array.length;i++){
            for(int j=0;j< array.length;j++){
                System.out.print(array[i][j]+" ");
            }
            System.out.println();
        }
        System.out.println("The numbers bigger than 10 are: "+count);
    }
}