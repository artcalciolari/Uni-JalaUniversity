import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);
        boolean control = false;
        int[][] array = {{10,5},{20,35}};

        System.out.println("Insert the number you wish to check: ");
        int x = read.nextInt();

        for(int i=0;i<array.length;i++){
            for(int j=0; j<array.length;j++){
                if(array[i][j] == x){
                    System.out.println("The number is located at the row: "+(i+1)+" and at the column: "+(j+1));
                    control = true;
                    break;
                }
            }
        }
        if(!control){
            System.out.println("The number isn't on the matrix.");
        }
    }
}