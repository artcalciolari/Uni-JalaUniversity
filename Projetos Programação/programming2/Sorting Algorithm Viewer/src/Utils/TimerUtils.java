package utils;

import javax.swing.*;

public class TimerUtils {

    private Timer timer;
    private static int seconds;

    public void startTimer() {
        seconds = 0;
        timer = new Timer(1000, e -> seconds++);
        timer.start();
    }

    public static int getSeconds() {
        return seconds;
    }
}
