public class Designer {
    public static void designGrid(Config config) {
        System.out.printf("Generation: %d Speed: %d Population: %d| \n", config.getGeneration(), config.getS(), config.getPopulation());

        int[][] grid = config.getDesign();
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[0].length; col++) {
                if (grid[row][col] == 1) {
                    System.out.print("\u001B[33m" + " +" + "\u001B[34m"); // if alive
                } else {
                    System.out.print(" -"); // if dead
                }
            }
            System.out.println();
        }
    }
}
