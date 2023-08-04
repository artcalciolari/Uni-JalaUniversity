import Utils.InputReader;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner read = new Scanner(System.in);
        ArrayList<Object> primaryList = new ArrayList<>();

        System.out.println("""
                Welcome.
                Please inform the size of the list you want to input:
                ↓\
                """);
        byte listSize = read.nextByte();

        try {

            for (int i = 0; i < listSize; i++) {
                System.out.println("Insert the entry number: " + (i + 1));
                Object userInput = InputReader.readInput(read);
                primaryList.add(userInput);
            }

            System.out.println("The original list is as follows: " + primaryList);
            Thread.sleep(1000);

            DuplicateChecker check = new DuplicateChecker();
            check.detectDuplicates(primaryList);

        } catch (Exception e) {
            System.out.println("Something went wrong.");
        }

    }
}

