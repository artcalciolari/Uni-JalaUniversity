package handlerClasses;

import algorithms.BubbleSort;
import algorithms.InsertionSort;
import algorithms.MergeSort;
import utils.RandomArrayGenerator;
import utils.Settings;

import javax.swing.*;
import java.util.Objects;

public class SettingsHandler {


    private final String inputString = Settings.getInput();
    private final String inputMethod = Settings.getInputMethod();
    private final String listType = Settings.getListType();
    private final String algorithmChosen = Settings.getAlgorithmChoice();
    private final String sortOrder = Settings.getSortOrder();
    private Object[] array;

    public void validateInputMethod(String inputMethod, String listType) {

        if (Objects.equals(inputMethod, "r")) {
            int input = Integer.parseInt(inputString);
            array = RandomArrayGenerator.generateRandomArray(input, listType);
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
                    if (Objects.equals(sortOrder, "az")) {
                        JOptionPane.showMessageDialog(null, "Java will use Bubble Sort and organize in ascending form.\nThe input method chosen was: " + inputMethod, "Program Starting", JOptionPane.INFORMATION_MESSAGE);
                        Thread.sleep(1500);
                        bubbleSort.sort(array, n);
                    } else {
                        JOptionPane.showMessageDialog(null, "Java will use Bubble Sort and organize in ascending form.\nThe input method chosen was: " + inputMethod, "Program Starting", JOptionPane.INFORMATION_MESSAGE);
                        Thread.sleep(1500);
                        bubbleSort.descendingOrder(array);
                    }
                }

                case "i" -> {
                    InsertionSort insertionSort = new InsertionSort();
                    if (Objects.equals(sortOrder, "az")) {
                        JOptionPane.showMessageDialog(null, "Java will use Insertion Sort and organize in ascending form.\nThe input method chosen was: " + inputMethod, "Program Starting", JOptionPane.INFORMATION_MESSAGE);
                        Thread.sleep(1500);
                        insertionSort.sort(array, n);
                    } else {
                        JOptionPane.showMessageDialog(null, "Java will use Insertion Sort and organize in ascending form.\nThe input method chosen was: " + inputMethod, "Program Starting", JOptionPane.INFORMATION_MESSAGE);
                        Thread.sleep(1500);
                        insertionSort.descendingOrder(array);
                    }
                }

                case "m" -> {
                    MergeSort mergeSort = new MergeSort();
                    if (Objects.equals(sortOrder, "az")) {
                        JOptionPane.showMessageDialog(null, "Java will use Merge Sort and organize in ascending form.\nThe input method chosen was: " + inputMethod, "Program Starting", JOptionPane.INFORMATION_MESSAGE);
                        Thread.sleep(1500);
                        mergeSort.sort(array, n);
                    } else {
                        JOptionPane.showMessageDialog(null, "Java will use Merge Sort and organize in ascending form.\nThe input method chosen was: " + inputMethod, "Program Starting", JOptionPane.INFORMATION_MESSAGE);
                        Thread.sleep(1500);
                        mergeSort.descendingOrder(array);
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Something went wrong.");
        }
    }
}
