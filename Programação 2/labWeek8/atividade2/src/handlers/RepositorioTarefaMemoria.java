package handlers;

import javax.swing.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class RepositorioTarefaMemoria implements RepositorioTarefa {

    private final List<Tarefa> fileTaskList;
    private final String FILE_NAME = "taskManagerExport.txt";
    ScrollPaneWithTextArea sp = new ScrollPaneWithTextArea();

    protected RepositorioTarefaMemoria() {
        fileTaskList = new ArrayList<>();
        fetchFromFile();
    }

    @Override
    public void addTaskToFile() {
        String taskNameToAdd = JOptionPane.showInputDialog("Input the task name:").toLowerCase();
        String taskDueDateToAdd = JOptionPane.showInputDialog("Now, the due-date (if applicable)\n[Please, Input data like this: DD-MM-YYYY]:");
        String taskStatusToAdd = JOptionPane.showInputDialog("Now, the task status:\n[FINISHED/ONGOING]").toUpperCase();

        if (taskNameToAdd.isEmpty()) {
            JOptionPane.showMessageDialog(null, "Task name cannot be empty.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        Tarefa taskToAdd = new Tarefa(taskNameToAdd, taskDueDateToAdd, taskStatusToAdd);
        fileTaskList.add(taskToAdd);

        writeToFile();
    }

    @Override
    public void fetchFromFile() {

        try {
            File file = new File(FILE_NAME);
            if (!file.exists()) {
                file.createNewFile();
            }

            Scanner readFile = new Scanner(file);
            while (readFile.hasNext()) {
                String line = readFile.nextLine();
                String[] parts = line.split(",");
                if (parts.length == 3) {
                    String taskName = parts[0].trim();
                    String taskDueDate = parts[1].trim();
                    String taskStatus = parts[2].trim();

                    Tarefa tarefa = new Tarefa(taskName, taskDueDate, taskStatus);
                    fileTaskList.add(tarefa);
                }
            }
            readFile.close();
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error ocurred while fetching data. " + e.getMessage(), "Error!", JOptionPane.ERROR_MESSAGE);
        }
    }


    @Override
    public void showAllTasks() {
        List<String> showTasks = new ArrayList<>();

        for (Tarefa tarefa : fileTaskList) {
            showTasks.add(tarefa.getTaskName() + "\nDue Date: " + tarefa.getTaskDueDate() + "\nStatus: " + tarefa.getTaskStatus());
        }

        String showAllList = CreateTaskList.createTaskListString(showTasks);

        JScrollPane scrollPane = sp.createScrollPaneWithTextArea(showAllList);

        JOptionPane.showMessageDialog(null, scrollPane, "Your Tasks", JOptionPane.INFORMATION_MESSAGE);
    }

    @Override
    public void lookupTaskByStatus() {
        List<String> tasksFetchedFromStatus = new ArrayList<>();
        String userKey = JOptionPane.showInputDialog("Insert task status [FINISHED/ONGOING]:").toUpperCase();

        for (Tarefa tarefa : fileTaskList) {
            if (tarefa.getTaskStatus().equals(userKey)) {
                tasksFetchedFromStatus.add(tarefa.getTaskName() + "\nDue Date: " + tarefa.getTaskDueDate() + "\nStatus: " + tarefa.getTaskStatus());
            }
        }

        String statusList = CreateTaskList.createTaskListString(tasksFetchedFromStatus);

        JScrollPane scrollPane = sp.createScrollPaneWithTextArea(statusList);

        JOptionPane.showMessageDialog(null, scrollPane, "Tasks Found!", JOptionPane.INFORMATION_MESSAGE);
    }

    @Override
    public void lookupTaskByName() {
        List<String> tasksFetchedFromName = new ArrayList<>();
        String userKey = JOptionPane.showInputDialog("Insert task name:").toLowerCase();

        for (Tarefa tarefa : fileTaskList) {
            if (tarefa.getTaskName().equals(userKey)) {
                tasksFetchedFromName.add(tarefa.getTaskName() + "\nDue Date: " + tarefa.getTaskDueDate() + "\nStatus: " + tarefa.getTaskStatus());
            }
        }

        String nameList = CreateTaskList.createTaskListString(tasksFetchedFromName);

        JScrollPane scrollPane = sp.createScrollPaneWithTextArea(nameList);

        JOptionPane.showMessageDialog(null, scrollPane, "Task found!", JOptionPane.INFORMATION_MESSAGE);

    }

    @Override
    public void deleteTasks() {
        String userChoice = JOptionPane.showInputDialog("Do you want to delete based on name or status?").toLowerCase();

        List<Tarefa> tasksToDelete = new ArrayList<>();
        String userKey = "";

        if (userChoice.equals("name")) {
            userKey = JOptionPane.showInputDialog("Insert task name:").toLowerCase();
        } else if (userChoice.equals("status")) {
            userKey = JOptionPane.showInputDialog("Insert task status:\n[FINISHED/ONGOING]").toUpperCase();
        }

        for (Tarefa tarefa : fileTaskList) {
            if (tarefa.getTaskName().equals(userKey) || tarefa.getTaskStatus().equals(userKey)) {
                tasksToDelete.add(tarefa);
            }
        }

        if (tasksToDelete.isEmpty()) {
            JOptionPane.showMessageDialog(null, "No tasks found with the given name or status.", "Task Not Found", JOptionPane.INFORMATION_MESSAGE);
            return;
        }

        fileTaskList.removeAll(tasksToDelete);

        writeToFile();

        JOptionPane.showMessageDialog(null, "Tasks deleted successfully.", "Tasks Deleted", JOptionPane.INFORMATION_MESSAGE);
    }

    private void writeToFile() {
        try (FileWriter writer = new FileWriter(FILE_NAME)) {
            for (Tarefa tarefa : fileTaskList) {
                String name = tarefa.getTaskName();
                String dueDate = tarefa.getTaskDueDate();
                String status = tarefa.getTaskStatus();
                writer.write(name + ", " + dueDate + ", " + status + "\n");
            }
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error occurred while writing to file. " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

}
