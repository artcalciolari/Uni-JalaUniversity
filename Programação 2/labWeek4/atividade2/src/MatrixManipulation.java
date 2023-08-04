public class MatrixManipulation {

    public void printMatrix(Object[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                System.out.print(matrix[i][j] + "\t");
            }
            System.out.println();
        }
    }

    public String printLeadingDiagonal(Object[][] matrix) {

        StringBuilder diagonalString = new StringBuilder();

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                if (i == j) {
                    diagonalString.append(matrix[i][j]).append("\t");
                }
            }
        }
        return diagonalString.toString();
    }

    public Object[][] transposeMatrix(Object[][] matrix) {
        int rows = matrix.length;
        int columns = matrix[0].length;

        Object[][] transposedMatrix = new Object[columns][rows];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                transposedMatrix[j][i] = matrix[i][j];
            }
        }
        return transposedMatrix;
    }
}
