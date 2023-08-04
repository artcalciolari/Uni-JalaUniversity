package Utils;

import HandlerClasses.Settings;

import java.util.List;

public class ArrayPrinter {
    public void printArray(List<Object[]> steps) throws InterruptedException {
        int iteration = 1;
        for (Object[] step : steps) {
            System.out.println("-------- Iteration: " + iteration + " --------");
            for (Object element : step) {
                System.out.print("|\t" + element + "\t|");
                if (element instanceof Integer) {
                    int num = (int) element;
                    for (int k = 0; k < num; k++) {
                        System.out.print("\t*");
                    }
                } else if (element instanceof Character) {
                    char ch = (char) element;
                    if (Settings.getListType().equals("c")) {
                        int numAscii = ((int) ch - 96);
                        for (int k = 0; k < numAscii; k++) {
                            System.out.print("\t*");
                        }
                    }
                }
                System.out.println();
            }
            Thread.sleep(Settings.getDelay());
            iteration++;
        }
    }
}