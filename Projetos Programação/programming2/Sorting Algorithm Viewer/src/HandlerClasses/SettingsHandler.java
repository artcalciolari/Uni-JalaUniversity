package HandlerClasses;

import Algorithms.BubbleSort;
import Algorithms.InsertionSort;
import Algorithms.MergeSort;

import java.util.Objects;

public class SettingsHandler {


    private final String inputString = Settings.getInput();
    private final String inputMethod = Settings.getInputMethod();
    private final String listType = Settings.getListType();
    private final String algorithmChosen = Settings.getAlgorithmChoice();
    private final String sortOrder = Settings.getSortOrder();
    private Object[] array;

    public SettingsHandler(Settings settings) {
    }

    public void validateInputMethod(String inputMethod, String listType) {

        if (Objects.equals(inputMethod, "r")) {
            int input = Integer.parseInt(inputString);
            array =  RandomArrayGenerator.generateRandomArray(input, listType);
        } else {
            String[] tempArray = inputString.split(",");
            Object[] finalArray = new Object[tempArray.length];
            for (int i = 0; i < tempArray.length; i++) {
                String value = tempArray[i].trim();
                if (value.matches("-?\\d+")) {
                    finalArray[i] = Integer.parseInt(value);
                } else {
                    finalArray[i] = (int) value.charAt(0); //print ascii values of letters
                }
            }

            array = finalArray;
        }
    }

    public void validateArguments() {

        validateInputMethod(inputMethod, listType);
        int n = array.length;

        try {
            switch (algorithmChosen) {
                case "b" -> {
                    BubbleSort bubbleSort = new BubbleSort();
                    if (Objects.equals(sortOrder,"az")) {
                        System.out.println("Java will use Bubble Sort and organize in a ascending form.\nThe input method chosen was: "+inputMethod);
                        Thread.sleep(1500);
                        bubbleSort.sort(array, n);
                    } else {
                        System.out.println("Java will use Bubble Sort and organize in a descending form.\nThe input method chosen was: "+inputMethod);
                        // ...
                    }

                }

                case "i" -> {
                    InsertionSort insertionSort = new InsertionSort();
                    if (Objects.equals(sortOrder,"az")) {
                        System.out.println("Java will use Insertion Sort and organize in a ascending form.\nThe input method chosen was: "+inputMethod);
                        Thread.sleep(1500);
                        insertionSort.sort(array, n);
                    } else {
                        System.out.println("Java will use Insertion Sort and organize in a descending form.\nThe input method chosen was: "+inputMethod);
                        // ...
                    }
                }

                case "m" -> {
                    MergeSort mergeSort = new MergeSort();
                    if (Objects.equals(sortOrder,"az")) {
                        System.out.println("Java will use Merge Sort and organize in a ascending form.\nThe input method chosen was: "+inputMethod);
                        Thread.sleep(1500);
                        mergeSort.sort(array, n);
                    } else {
                        System.out.println("Java will use Merge Sort and organize in a descending form.\nThe input method chosen was: "+inputMethod);
                        // ...
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Something went wrong.");
        }
    }
}
