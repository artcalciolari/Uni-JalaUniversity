public class liveCount {
    public static void liveCount(Config config){
        int liveCells = 1;
        for(int i = 0; i < config.getW(); i++){
            for(int j = 0; j < config.getH(); j++){
                if(config.getDesign()[i][j] == 1){
                    config.setPopulation(liveCells++);
                }
            }
        }
    }
}
