import handlerClasses.SettingsHandler;
import utils.GlobalCounter;
import utils.Settings;
import utils.TimerUtils;

import javax.swing.*;
import java.text.DecimalFormat;

public class SAV {
    public static void main(String[] args) {

        long startTime = System.currentTimeMillis();

        TimerUtils timer = new TimerUtils();
        timer.startTimer();

        //substrings used to cut the initial part of the argument
        String algChoice = args[0].substring(2).toLowerCase();
        String listType = args[1].substring(2).toLowerCase();
        String sortOrder = args[2].substring(2).toLowerCase();
        String inputMethod = args[3].substring(3).toLowerCase();
        String inputString = args[4].substring(2);
        String delay = args[5].substring(2);

        int finalDelay = Integer.parseInt(delay);

        new Settings(algChoice, listType, sortOrder, inputMethod, inputString, finalDelay);
        SettingsHandler settingsHandler = new SettingsHandler();//initiating our class that validates everything
        settingsHandler.validateArguments();

        long endTime = System.currentTimeMillis();
        double totalDelayTimerUser = GlobalCounter.getCounter() * Settings.getDelay();
        double elapsedTime = (endTime - startTime - totalDelayTimerUser) / 1000; // Calculating time in ms

        DecimalFormat decimalFormat = new DecimalFormat("#.##");
        JOptionPane.showMessageDialog(null, "Without taking into account the time between delays,\nthe computational time was: " + decimalFormat.format(elapsedTime) + " seconds.", "Program Finished", JOptionPane.INFORMATION_MESSAGE);
    }
}