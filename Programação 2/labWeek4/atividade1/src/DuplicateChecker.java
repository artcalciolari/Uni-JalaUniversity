import java.util.ArrayList;
import java.util.LinkedList;

public class DuplicateChecker {
    public void detectDuplicates(ArrayList<Object> primaryList) {
        try {
            LinkedList<Object> secondaryList = new LinkedList<>();
            int i = 0;

            while (i < primaryList.size()) {
                Object element = primaryList.get(i);

                if (primaryList.indexOf(element) != i) {
                    secondaryList.add(element);
                    primaryList.remove(i);
                } else {
                    i++;
                }
            }

            System.out.println("The numbers were successfully detected and added to the secondary list.");

            Thread.sleep(1000);

            System.out.println("The list without duplicates is: " + primaryList);
            System.out.println("The duplicates found on the primary list were the following: " + secondaryList);

        } catch (Exception e) {
            System.out.println("Something went wrong.");
        }

    }
}
