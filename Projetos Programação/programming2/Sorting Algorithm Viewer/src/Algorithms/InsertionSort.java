package algorithms;

import graphicalInterface.GUI;

import java.util.ArrayList;
import java.util.List;

public class InsertionSort implements SortingArrays {
    final List<Object[]> steps = new ArrayList<>();

    @Override
    public void sort(Object[] arr, int arrayLength) {
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

        GUI visualizer = new GUI();
        visualizer.setVisible(true);
        visualizer.displayList(steps);
    }

    @Override
    public void descendingOrder(Object[] arr) {
        List<Object[]> stepsDescending = new ArrayList<>();
        int size = arr.length;
        for (int step = 1; step < size; step++) {
            Object key = arr[step];
            int j = step - 1;
            while (j >= 0 && compare(arr[j], key) < 0) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;

            stepsDescending.add(arr.clone());
        }

        GUI visualizer = new GUI();
        visualizer.setVisible(true);
        visualizer.displayList(stepsDescending);
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