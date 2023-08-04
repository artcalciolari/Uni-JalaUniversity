public class Rules {
    public static void ruleUpdate(Config config) {
        for (int row = 0; row <config.getW(); row++) {
            for (int col = 0; col < config.getH(); col++) {
                int neighboursRule = 0;

                for (int i = -1; i <= 1; i++) {
                    for (int j = -1; j <= 1; j++) {
                        if ((row + i >= 0 && row + i < config.getW()) && (col + j >= 0 && col + j < config.getH())) {
                            neighboursRule += config.getDesign()[row + i][col + j];
                        }
                    }
                }
                neighboursRule -= config.getDesign()[config.getW() - 1][config.getH() - 1];

                if ((config.getDesign()[row][col] == 1) && (neighboursRule < 2)) {
                    config.getDesign()[row][col] = 0;
                } else if ((config.getDesign()[row][col] == 1) && (neighboursRule > 3)) {
                    config.getDesign()[row][col] = 0;
                } else if ((config.getDesign()[row][col] == 0) && (neighboursRule == 3)) {
                    config.getDesign()[row][col] = 1;
                } else {
                    config.getDesign()[row][col] = config.getDesign()[row][col];
                }
            }
        }
    }
}
