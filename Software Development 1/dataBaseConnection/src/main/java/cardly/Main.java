package cardly;


import cardly.DAO.UsersDAO;
import cardly.model.Users;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import static java.lang.Integer.*;

public class Main {

    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);
        int userInput;

        System.out.println("=================================================== WELCOME ====================================================");

        while (true) {
            System.out.println("-------------------------------------------------- MAIN MENU ---------------------------------------------------");
            System.out.println("Available options: [INSERT = 1] | [UPDATE = 2] | [DELETE = 3] | [SELECT ALL = 4] | [SELECT BY ID = 5] [EXIT = 0]");
            System.out.print("Insert your desired option\n==> ");

            userInput = parseInt(read.nextLine());
            UsersDAO usersDAO = new UsersDAO();

            switch (userInput) {
                case 0:
                    System.out.printf("Shutting down. Have a nice day.");
                    return;
                case 1:
                Users users = new Users();

                String savingEmail, savingUsername, savingPassword;
                System.out.println("Insert the email to be saved: ");
                savingEmail = read.nextLine();

                System.out.println("Insert the username to be saved: ");
                savingUsername = read.nextLine();

                System.out.println("Insert the password to be saved: ");
                savingPassword = read.nextLine();

                users.setEmail(savingEmail);
                users.setUsername(savingUsername);
                users.setPassword(savingPassword);

                Users insertedUsers = usersDAO.save(users);
                System.out.println("The user was successfully registered. The ID is: " + insertedUsers.getUser_id());
                break;

                case 2:
                String updatingEmail, updatingUsername, updatingPassword;
                int updatingID;

                System.out.print("Insert the ID from the entry you wish to UPDATE: ");
                updatingID = parseInt(read.nextLine());

                System.out.print("Insert the email to be saved: ");
                updatingEmail = read.nextLine();

                System.out.print("Insert the username to be saved: ");
                updatingUsername = read.nextLine();

                System.out.print("Insert the password to be saved: ");
                updatingPassword = read.nextLine();

                Optional<Users> usersUpdate = usersDAO.findByID(updatingID);
                Users updatedUsers = usersUpdate. get();
                updatedUsers.setEmail(updatingEmail);
                updatedUsers.setUsername(updatingUsername);
                updatedUsers.setPassword(updatingPassword);

                usersDAO.update(updatedUsers);
                System.out.println("The entry was successfully updated.");
                break;

                case 3:
                int deletingID;

                System.out.print("Insert the ID from the entry you wish to DELETE: ");
                deletingID = parseInt(read.nextLine());

                usersDAO.delete(deletingID);
                System.out.println("Entry deleted successfully.");
                break;

                case 4:
                System.out.println("Fetching data...");
                List<Users> findAllusers = usersDAO.findAll();

                for (Users user : findAllusers) {
                    System.out.println("ID: " + user.getUser_id());
                    System.out.println("Email: " + user.getEmail());
                    System.out.println("Username: " + user.getUsername());
                    System.out.println("Password: " + user.getPassword());

                    System.out.println("======================");
            }
                break;

                case 5:
                int searchingID;

                System.out.print("Insert the ID from the entry you wish to look for: ");
                searchingID = parseInt(read.nextLine());
                System.out.println("Fetching data...");

                Optional<Users> byEmail = usersDAO.findByID(searchingID);
                byEmail.ifPresent(findSingleUser -> {
                    System.out.println("ID: " + findSingleUser.getUser_id());
                    System.out.println("Email: " + findSingleUser.getEmail());
                    System.out.println("Username: " + findSingleUser.getUsername());
                    System.out.println("Password: " + findSingleUser.getPassword());
                });
                break;

            default:
                System.out.println("This option is not available. Try again.");
            }
        }
    }
}
