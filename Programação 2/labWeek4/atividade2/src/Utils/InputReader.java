package Utils;

import java.util.Scanner;

public class InputReader {

    public static Object readInput(Scanner read) {
        if (read.hasNextInt()) {
            return read.nextInt();

        } else if (read.hasNextDouble()) {
            return read.nextDouble();

        } else {
            return read.next();
        }
    }
}
