package utils;

import java.util.Random;

public class RandomArrayGenerator {
    public static Object[] generateRandomArray(int limit, String type) {
        Object[] randomArray = new Object[limit];

        Random random = new Random();

        if (type.equals("n")) {
            for (int i = 0; i < limit; i++) {
                randomArray[i] = random.nextInt(101); // Generates a random number between 0-100 and adds to the array at the position i
            }
        } else if (type.equals("c")) {
            for (int i = 0; i < limit; i++) {
                randomArray[i] = (char) (random.nextInt(26) + 'a'); // Generates a random character (only lowercase) between a-z and adds to the array at the position i
            }
        } else {
            throw new IllegalArgumentException("Invalid array data type: " + type);
        }

        return randomArray;
    }
}