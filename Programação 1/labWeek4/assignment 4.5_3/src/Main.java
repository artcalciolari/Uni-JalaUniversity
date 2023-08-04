import java.util.Scanner;
public class Main {
        public static void main(String[] args){
            int L, C;
            Scanner read = new Scanner(System.in);
            System.out.println("Start by informing the size of the matrix");
            System.out.println("Insert the amount of lines: ");
            L = read.nextInt();
            System.out.println("Insert the amount of columns: ");
            C = read.nextInt();
            double[][] matrix = new double[L][C];
//loop preenchimento matriz
            System.out.println("Insert the values of a " + L + "X" + C + " matrix (about " + (L * C) + " numbers)");
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix.length; j++) {
                    matrix[i][j] = read.nextInt();
                }
            }
//loop para impressao matriz
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix.length; j++) {
                    System.out.print(matrix[i][j] +"\t");
                }
                System.out.println();
            }
            boolean matrixSymmetry = matrixSymmetry(matrix);
            double resultDet = matrixDet(matrix);
            System.out.println("The matrix determinant is: "+resultDet);
            if(matrixSymmetry == true){
                System.out.println("The matrix is symmetrical.");
            }else{
                System.out.println("The matrix is not symmetrical.");
            }
        }
    public static double matrixDet(double [][] matrix) {
        double resultDet = 0;
        int n = matrix.length;
        if (n == 1) {
            resultDet = matrix[0][0];
        } else if (n == 2) {
            resultDet = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        } else {
            for (int j = 0; j < n; j++) {
                double[][] submatrix = new double[n - 1][n - 1];
                for (int i = 1; i < n; i++) {
                    for (int k = 0; k < n; k++) {
                        if (k < j) {
                            submatrix[i - 1][k] = matrix[i][k];
                        } else if (k > j) {
                            submatrix[i - 1][k - 1] = matrix[i][k];
                        }
                    }
                }
                resultDet += Math.pow(-1, j) * matrix[0][j] * matrixDet(submatrix);
            }
        }
        return resultDet;
    }
    public static boolean matrixSymmetry(double [][] matrix){
        int line = matrix.length;
        int columns = matrix[0].length;
        if (line != columns) {
            return false;
        }
        for (int i = 0; i < line; i++) {
            for (int j = i + 1; j < columns; j++) {
                if (matrix[i][j] != matrix[j][i]) {
                    return false;
                }
            }
        }
        return true;
    }
}