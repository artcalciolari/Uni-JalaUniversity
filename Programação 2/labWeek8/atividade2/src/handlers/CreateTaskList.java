package handlers;

import java.util.List;

class CreateTaskList {
    protected static String createTaskListString(List<String> tasks) {
        StringBuilder sb = new StringBuilder();
        for (String task : tasks) {
            sb.append("Tarefa: ").append(task).append("\n").append("-----------------------------").append("\n");
        }
        return sb.toString();
    }
}
