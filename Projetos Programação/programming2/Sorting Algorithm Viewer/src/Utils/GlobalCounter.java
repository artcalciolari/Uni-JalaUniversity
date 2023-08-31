package utils;

public class GlobalCounter {

    private static int counter = 0;
    public static void increaseCounter() {
        counter++;
    }

    public static int getCounter() {
        return counter;
    }
}
