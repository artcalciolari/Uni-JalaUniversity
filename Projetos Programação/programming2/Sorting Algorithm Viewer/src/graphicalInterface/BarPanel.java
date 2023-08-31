package graphicalInterface;

import utils.GlobalCounter;
import utils.TimerUtils;

import javax.swing.*;
import java.awt.*;

public class BarPanel extends JPanel {

    private Object[] objects;


    public void setObjects(Object[] objects) {
        this.objects = objects;
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.BLACK);
        g.fillRect(0, 0, getWidth(), getHeight());
        if (objects != null) {
            int barWidth = getWidth() / objects.length;
            int maxHeight = getHeight();

            // generate the bars graphically
            for (int i = 1; i < objects.length; i++) {
                int barHeight = getBarHeight(i, maxHeight);
                int x = (int) ((i * barWidth) * 1.075);
                int y = getHeight() - barHeight;
                g.setColor(Color.WHITE);
                g.fillRect(x, y, barWidth, barHeight);
                g.setColor(Color.BLACK);
            }

            // Draw vertical lines to separate the columns
            g.setColor(Color.BLACK);
            for (int i = 1; i < objects.length; i++) {
                int x = (int) ((i * barWidth) * 1.075);
                int y = getHeight() - getBarHeight(i, maxHeight);
                g.drawLine(x, y, x, getHeight());
            }

            // Draw the counter display
            g.setColor(Color.WHITE);
            g.setFont(new Font("Verdana", Font.ITALIC, 20));
            g.drawString("Iterations: " + GlobalCounter.getCounter(), 20, 30);

            // Draw the timer
            g.drawString("Total Execution Time: " + TimerUtils.getSeconds() + " seconds", 200, 30);
        }
    }

    private int getBarHeight(int i, int maxHeight) {
        Object object = objects[i];
        int barHeight = 0;
        if (object instanceof Integer) {
            int num = (int) object;
            int absNum = Math.abs(num); // Get the absolute value of the number
            barHeight = (int) (((double) absNum / maxHeight) * getHeight() * 7);
        } else if (object instanceof Character) {
            char ch = (char) object;
            int numAscii = ((int) ch - 96);
            barHeight = (int) (((double) numAscii / maxHeight) * getHeight() * 7);
        }
        return barHeight;
    }
}
