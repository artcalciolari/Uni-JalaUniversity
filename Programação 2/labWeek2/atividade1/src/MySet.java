import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MySet {
    Scanner read = new Scanner(System.in);
    byte listSize;
    int userInput;
    List<Integer> numberList = new ArrayList<>();
    String addToList(){
            try {
        System.out.println("Insert the size of the list: ");
        listSize = read.nextByte();
            for (int i = 0; i < listSize; i++) {
                System.out.println("Insert the entry number " + (i + 1) + ":");
                userInput = read.nextInt();

                if (numberList.contains(userInput)) {
                    System.out.println("This number is already on the list. Try again");
                    Thread.sleep(1000);
                    i--;
                } else if (userInput > 1000 || userInput == 0) {
                    System.out.println("This number is way too big, or it's 0.");
                    Thread.sleep(1000);
                    i--;
                } else if (userInput < 0) {
                    System.out.println("A negative number was input. The program is shutting down");
                    break;
                } else {
                    numberList.add(userInput);
                }
            }
        } catch (Exception e) {
                System.out.println("Something went wrong. Please, try again");
        }
            return numberList.toString();
    }
}