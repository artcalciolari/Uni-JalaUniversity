import javax.swing.*;

public class Main {

    public static void main(String[] args) throws InterruptedException {
        Config config = new Config();
        String[] textW = args[0].split("w=");
        int w = Integer.parseInt(textW[1]);

        String[] textH = args[1].split("h=");
        int h = Integer.parseInt(textH[1]);
        String[]textG = args[2].split("g=");
        int g = Integer.parseInt(textG[1]);
        int generation = 0;
        String[] textS = args[3].split("s=");
        int s = Integer.parseInt(textS[1]);

        String[] textP = args[4].split("p=");
        String p = textP[1];

        config = new Config(h, w, generation, s, p);
        patternReader.patternReader(config);

        while (config.getGeneration() < g) {

            Rules.ruleUpdate(config);
            liveCount.liveCount(config);
            config.setGeneration(config.getGeneration()+1);
            Designer.designGrid(config);
            Thread.sleep(s);


        }
    }
}