import java.util.Objects;
public class patternReader {
    public static void patternReader(Config config){
        int line = 0;
        for (String setChars : config.getP().split("#")) {
            int count = 0;
            for (int col = 0; col < setChars.length(); col++) {
                String getChar = String.valueOf(setChars.charAt(count));
                if (Objects.equals(getChar, "1")) {
                    config.getDesign()[line][col] = 1;
                } else if (Objects.equals(getChar, "0")) {
                    config.getDesign()[line][col] = 0;
                }
                count++;
            }
            line++;
        }
        Designer.designGrid(config);
    }
}