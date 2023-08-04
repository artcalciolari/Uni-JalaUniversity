import javax.swing.*;

public class Main {
    public static void main(String[] args) {

        int input = JOptionPane.showConfirmDialog(null,"Do you wish to start?\nKeep in mind the file path.", "  ctivity 1", JOptionPane.YES_NO_OPTION);

        if (JOptionPane.YES_OPTION == input) {
            FetchTxt fetch = new FetchTxt();
            fetch.fetchThenAdd();
        } else {
            JOptionPane.showMessageDialog(null,"Shutting down.\nHave a nice day :)");
        }

    }
}