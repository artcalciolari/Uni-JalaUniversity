package handlers;

class Tarefa {

    private final String taskName;
    private final String taskDueDate;
    private final String taskStatus;

    public Tarefa(String taskName, String taskDueDate, String taskStatus) {
        this.taskName = taskName;
        this.taskDueDate = taskDueDate;
        this.taskStatus = taskStatus;
    }

    protected String getTaskName() {
        return taskName;
    }

    protected String getTaskDueDate() {
        return taskDueDate;
    }

    protected String getTaskStatus() {
        return taskStatus;
    }
}
