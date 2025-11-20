public class Fibonacci {

    public static void main(String[] args) {
        int n = 40;
        long iterations = 100_000_000;
        int final_b = 0;

        long startTime = System.nanoTime();

        for (long k = 0; k < iterations; k++) {
            int a = 0;
            int b = 1;
            int c;

            for (int i = 2; i <= n; i++) {
                c = a + b;
                a = b;
                b = c;
            }
            final_b = b;
        }

        long endTime = System.nanoTime();
        double durationInSeconds = (endTime - startTime) / 1_000_000_000.0;

        System.out.println("Fibonacci(" + n + ") = " + final_b);
        System.out.println("Execution Time (Java): " + durationInSeconds + " seconds");
    }
}