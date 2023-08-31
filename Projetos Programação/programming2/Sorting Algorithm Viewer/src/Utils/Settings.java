package utils;

public class Settings {
    private static String algorithmChoice; //algorithmChoice = b,m or i
    private static String listType; //listType = n or c
    private static String inputMethod; //inputMethod = r or m;
    private static String sortOrder;// sortOrder = az or za (.lowerCase())
    private static String input; //input = "1,2,5,6,7"(if inputMethod = m) or "10" (if inputMethod = r)
    private static int delay;


    public Settings(String algorithmChoice, String listType, String sortOrder, String inputMethod, String input, int delay) {
        Settings.algorithmChoice = algorithmChoice;
        Settings.listType = listType;
        Settings.sortOrder = sortOrder;
        Settings.inputMethod = inputMethod;
        Settings.input = input;
        Settings.delay = delay;
    }

    public static String getAlgorithmChoice() {
        return algorithmChoice;
    }

    public static String getListType() {
        return listType;
    }

    public static String getInputMethod() {
        return inputMethod;
    }

    public static String getSortOrder() {
        return sortOrder;
    }

    public static int getDelay() {
        return delay;
    }

    public static String getInput() {
        return input;
    }

}
