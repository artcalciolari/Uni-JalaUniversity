import handlers.Menu;

import javax.swing.*;

public class Main {
    public static void main(String[] args) {

        if (args.length > 0) {
            String filePath = args[0];
            Menu menu = new Menu(filePath);
            menu.start();
        } else {
            JOptionPane.showMessageDialog(null,"No file path provided!");
        }
    }
}
