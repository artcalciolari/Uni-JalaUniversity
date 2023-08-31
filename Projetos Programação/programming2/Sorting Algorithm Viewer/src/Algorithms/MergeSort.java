package algorithms;

import graphicalInterface.GUI;

import java.util.ArrayList;
import java.util.List;

public class MergeSort implements SortingArrays {
    final List<Object[]> steps = new ArrayList<>();

    @Override
    public void sort(Object[] arr, int arrayLength) {
        mergeSort(arr, 0, arrayLength - 1);
        GUI visualizer = new GUI();
        visualizer.setVisible(true);
        visualizer.displayList(steps);
    }

    @Override
    public void descendingOrder(Object[] arr) {
        mergeSortDescending(arr, 0, arr.length - 1);
        GUI visualizer = new GUI();
        visualizer.setVisible(true);
        visualizer.displayList(steps);
    }

    private void mergeSort(Object[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            merge(arr, left, mid, right);

            steps.add(arr.clone());
        }
    }

    private void merge(Object[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        Object[] L = new Object[n1];
        Object[] R = new Object[n2];

        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);

        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (compare(L[i], R[j]) <= 0) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    private void mergeSortDescending(Object[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            mergeSortDescending(arr, left, mid);
            mergeSortDescending(arr, mid + 1, right);

            mergeDescending(arr, left, mid, right);

            steps.add(arr.clone());
        }
    }

    private void mergeDescending(Object[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        Object[] L = new Object[n1];
        Object[] R = new Object[n2];

        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);

        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (compare(L[i], R[j]) >= 0) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
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