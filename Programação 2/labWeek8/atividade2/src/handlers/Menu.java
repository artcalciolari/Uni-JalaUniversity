package handlers;

import javax.swing.*;

public class Menu {
    RepositorioTarefaMemoria rtm = new RepositorioTarefaMemoria();
    public void showMenu() {
        int userChoice = 0;
        String menu = """
                ----- MENU -----
                1. Show all tasks
                2. Lookup tasks by STATUS
                3. Lookup task by NAME
                4. Add a new task
                5. Exit""";

        while (userChoice != 5) {
            String optionChosen = JOptionPane.showInputDialog(null, menu + "\nChoose a option: ");

            try {
                userChoice = Integer.parseInt(optionChosen);
                switch (userChoice) {
                    case 1 -> rtm.showAllTasks();
                    case 2 -> rtm.lookupTaskByStatus();
                    case 3 -> rtm.lookupTaskByName();
                    case 4 -> rtm.addTaskToFile();
                    case 5 -> JOptionPane.showMessageDialog(null, "Shutting down. Have a nice day!");
                }
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(null, "Invalid Option. Double check your parameters!", "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}