import HandlerClasses.Settings;
import HandlerClasses.SettingsHandler;

import java.text.DecimalFormat;

public class SAV {
    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();

        //substrings used to cut the initial part of the argument
        String algChoice = args[0].substring(2).toLowerCase();
        String listType = args[1].substring(2).toLowerCase();
        String sortOrder = args[2].substring(2).toLowerCase();
        String inputMethod = args[3].substring(3).toLowerCase();
        String inputString = args[4].substring(2);
        String delay = args[5].substring(2);

        int finalDelay = Integer.parseInt(delay);

        Settings settings = new Settings(algChoice, listType, sortOrder, inputMethod, inputString, finalDelay); //initiating the object that controls all of the atributes

        SettingsHandler settingsHandler = new SettingsHandler(settings); //initiating our class that validates everything
        settingsHandler.validateArguments();

        long endTime = System.currentTimeMillis();
        double elapsedTime = (double) (endTime - startTime) / 1000; // Calculating time in ms

        DecimalFormat decimalFormat = new DecimalFormat("0.000");
        System.out.println("\nTotal time spent: " + decimalFormat.format(elapsedTime));
    }
}