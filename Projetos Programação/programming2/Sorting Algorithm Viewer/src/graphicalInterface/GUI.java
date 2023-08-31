package graphicalInterface;

import utils.GlobalCounter;
import utils.Settings;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class GUI extends JFrame {

    private final BarPanel barPanel;

    public GUI() {
        setTitle("Sorting Visualizer");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1000, 800);
        setLocationRelativeTo(null);

        barPanel = new BarPanel();
        barPanel.setPreferredSize(new Dimension(1000, 800));
        getContentPane().add(barPanel, BorderLayout.CENTER);
    }

    public void displayList(List<Object[]> steps) {
        for (Object[] step : steps) {
            GlobalCounter.increaseCounter();
            barPanel.setObjects(step);
            try {
                Thread.sleep(Settings.getDelay());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
