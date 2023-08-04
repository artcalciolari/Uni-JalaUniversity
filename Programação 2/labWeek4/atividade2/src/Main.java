import Utils.InputReader;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner read = new Scanner(System.in);
        MatrixManipulation manipulation = new MatrixManipulation();

        try {
            System.out.println("""
                    Welcome.
                    PLEASE NOTE that only square matrices are allowed.
                    Please start by inputting the amount of lines of your matrix:
                    ↓\
                    """);
            byte amountOfLines = read.nextByte();
            System.out.println("Now the amount of columns:\n↓");
            byte amountOfColumns = read.nextByte();

            if (amountOfLines != amountOfColumns) {
                System.out.println("Invalid matrix size.");
            }

            Object[][] matrix = new Object[amountOfLines][amountOfColumns];

            for (int l = 0; l < amountOfLines; l++) {
                for (int c = 0; c < amountOfColumns; c++) {
                    System.out.println("Insert the number on the position " + (l + 1) + "x" + (c + 1));
                    matrix[l][c] = InputReader.readInput(read);
                }
            }
            System.out.println("""
                    Which option do you want do do?
                    1. Print the matrix
                    2. Find the leading diagonal
                    3. Transpose it
                    4. All of the above ԅ(≖‿≖ԅ)
                    ↓\
                    """);
            byte userChoice = read.nextByte();

            switch (userChoice) {
                case 1 -> {
                    System.out.println("The matrix you input is listed bellow:");
                    manipulation.printMatrix(matrix);
                }

                case 2 -> System.out.println("The leading diagonal is: " + manipulation.printLeadingDiagonal(matrix));

                case 3 -> {
                    Object[][] transposedMatrix = manipulation.transposeMatrix(matrix);
                    manipulation.printMatrix(transposedMatrix);
                }

                case 4 -> {
                    System.out.println("The matrix you input is listed bellow:");
                    manipulation.printMatrix(matrix);
                    Thread.sleep(1000);

                    System.out.println("The leading diagonal is: " + manipulation.printLeadingDiagonal(matrix));
                    Thread.sleep(1000);

                    System.out.println("The transposed matrix is listed below:");
                    Object[][] transposedMatrix = manipulation.transposeMatrix(matrix);
                    manipulation.printMatrix(transposedMatrix);
                }
            }

        } catch (Exception e) {
            System.out.println("Something went wrong.");
        }


    }
}
