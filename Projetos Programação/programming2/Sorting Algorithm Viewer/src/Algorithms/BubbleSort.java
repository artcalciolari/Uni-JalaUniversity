package Algorithms;

import Utils.ArrayPrinter;

import java.util.ArrayList;
import java.util.List;

public class BubbleSort implements SortingArrays {
    List<Object[]> steps = new ArrayList<>();
    ArrayPrinter arrayPrinter = new ArrayPrinter();

    @Override
    public void sort(Object[] arr, int arrayLength) throws InterruptedException {
        int i, j;
        boolean swapped;
        for (i = 0; i < arrayLength - 1; i++) {
            swapped = false;
            for (j = 0; j < arrayLength - i - 1; j++) {
                if (compare(arr[j], arr[j + 1]) > 0) {
                    swap(arr, j, j + 1);
                    swapped = true;
                }
            }
            steps.add(arr.clone());

            if (!swapped) {
                break;
            }
        }
        arrayPrinter.printArray(steps);
    }

    @Override
    public void descendingOrder(Object[] arr) {
        int start = 0;
        int end = arr.length - 1;
        while (start < end) {
            swap(arr, start, end);
            start++;
            end--;
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

    private void swap(Object[] arr, int i, int j) {
        Object temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}