import handlerClasses.Regiao;

import javax.swing.*;

public class Main {
    public static void main(String[] args) {

        int input = JOptionPane.showConfirmDialog(null, "Do you wish to start?\nKeep in  mind the file name and file path.", "  Activity 1", JOptionPane.YES_NO_OPTION);

        if (JOptionPane.YES_OPTION == input) {
            String filePath = JOptionPane.showInputDialog(null, "Insert your filepath and name:");
            Regiao hv = new Regiao(filePath);
            hv.fetchCsv();
        } else {
            JOptionPane.showMessageDialog(null, "Shutting down.\nHave a nice day :)");
        }
    }
}