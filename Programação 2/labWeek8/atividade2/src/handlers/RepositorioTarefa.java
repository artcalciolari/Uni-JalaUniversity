package handlers;

abstract interface RepositorioTarefa {

    abstract void addTaskToFile();

    abstract void fetchFromFile();

    abstract void lookupTaskByStatus();

    abstract void lookupTaskByName();

    abstract void showAllTasks();
}
