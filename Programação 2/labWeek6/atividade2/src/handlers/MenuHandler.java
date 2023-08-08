package handlers;

import javax.swing.*;

public class MenuHandler {
    ContactHandler ch = new ContactHandler();

    public void showMenu() {
        int userChoice = 0;
        String menu = """
                    ----- MENU -----
                    1. Show all contacts
                    2. Add a new contact
                    3. Lookup a contact
                    4. Remove a contact
                    5. Exit""";

        while (userChoice != 5) {
            String optionChosen = JOptionPane.showInputDialog(null, menu + "\nChoose a option: ");

            try {
                userChoice = Integer.parseInt(optionChosen);
                switch (userChoice) {
                    case 1 -> ch.listarContatos();
                    case 2 -> ch.adicionarContatos();
                    case 3 -> ch.consultarContatos();
                    case 4 -> ch.removerContatos();
                    case 5 -> JOptionPane.showMessageDialog(null, "Shutting down. Have a nice day!");
                }
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(null,"Invalid Option. Double check your parameters!", "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}
