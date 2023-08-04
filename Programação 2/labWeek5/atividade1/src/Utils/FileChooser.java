package Utils;

import javax.swing.*;

public class FileChooser {
    public String txtChooser() {
        String file = JOptionPane.showInputDialog(null, "Choose your file: \n src/Assets/proteina(1-2).txt");
        return file;
    }
}
