package Algorithms;

import Utils.ArrayPrinter;

import java.util.ArrayList;
import java.util.List;

public class InsertionSort implements SortingArrays {
    List<Object[]> steps = new ArrayList<>();
    ArrayPrinter arrayPrinter = new ArrayPrinter();

    @Override
    public void sort(Object[] arr, int arrayLength) throws InterruptedException {
        for (int i = 1; i < arrayLength; i++) {
            Object key = arr[i];
            int j = i - 1;

            while (j >= 0 && compare(arr[j], key) > 0) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;

            steps.add(arr.clone());
        }

        arrayPrinter.printArray(steps);
    }

    @Override
    public void descendingOrder(Object[] arr) {
        for (int i = 1; i < arr.length; i++) {
            Object key = arr[i];
            int j = i - 1;

            while (j >= 0 && compare(arr[j], key) < 0) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    private int compare(Object obj1, Object obj2) {
        if (obj1 instanceof Integer && obj2 instanceof Integer) {
            return ((Integer) obj1).compareTo((Integer) obj2);
        } else if (obj1 instanceof Character && obj2 instanceof Character) {
            return ((Character) obj1).compareTo((Character) obj2);
        } else {
            throw new IllegalArgumentException("Invalid comparison between different types.");
        }
    }
}