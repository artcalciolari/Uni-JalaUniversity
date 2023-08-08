package handlers;

import entities.Contato;

import javax.swing.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

class ContactHandler {

    private final HashMap<String, Contato> hashContatos;
    private final String FILE_NAME = "contatos.txt";

    protected ContactHandler() {
        hashContatos = new HashMap<>();
        carregarContatos();
    }

    protected void carregarContatos() {
        try {
            File file = new File(FILE_NAME);
            if (!file.exists()) {
                file.createNewFile();
            }

            Scanner readFile = new Scanner(file);
            while (readFile.hasNext()) {
                String line = readFile.nextLine();
                String[] parts = line.split(",");
                if (parts.length == 2) {
                    String nome = parts[0].trim();
                    String telefone = parts[1].trim();
                    Contato contactToLoad = new Contato(nome, telefone);
                    hashContatos.put(nome, contactToLoad);
                }
            }
            readFile.close();
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null,"Error ocurred while fetching data. "+e.getMessage());
        }
    }

    protected void adicionarContatos() {
        String nome = JOptionPane.showInputDialog("Input the contact name to be added: ");

        String telefone = JOptionPane.showInputDialog("Now, the phone-number: ");

        Contato contactToAdd = new Contato(nome, telefone);

        hashContatos.put(nome, contactToAdd);

        salvarContatos();

        JOptionPane.showMessageDialog(null,"Contact successfully added!");
    }

    protected void listarContatos() {
        StringBuilder listaContatos = new StringBuilder();
        for (Map.Entry<String, Contato> entry : hashContatos.entrySet()) {
            String nome = entry.getKey();
            String telefone = entry.getValue().getTelefone();
            listaContatos.append(nome).append(": ").append(telefone).append("\n");
        }
        JOptionPane.showMessageDialog(null,"Contact List:\n"+ listaContatos);
    }

    protected void consultarContatos() {
        String nome = JOptionPane.showInputDialog("Insert the contact's name: ");

        Contato contactToLookUp = hashContatos.get(nome);

        if (contactToLookUp != null) {
            JOptionPane.showMessageDialog(null,contactToLookUp.getNome()+" phone-number is: "+contactToLookUp.getTelefone());
        } else {
            JOptionPane.showMessageDialog(null,"Contact not found.");
        }
    }

    protected void removerContatos() {
        String nome = JOptionPane.showInputDialog("Insert the contact's name to be removed: ");

        Contato contactToRemove = hashContatos.get(nome);
        hashContatos.remove(nome);

        if (contactToRemove != null) {
            salvarContatos();
            JOptionPane.showMessageDialog(null,"Contact successfully removed!");
        } else {
            JOptionPane.showMessageDialog(null,"Contact not found.");
        }
    }

    private void salvarContatos() {
        try {
            FileWriter writer = new FileWriter(FILE_NAME);
            for (Map.Entry<String, Contato> entry : hashContatos.entrySet()) {
                String nome = entry.getKey();
                String telefone = entry.getValue().getTelefone();
                writer.write(nome+", "+telefone+"\n");
            }
            writer.close();
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null,"Error ocurred while writing to file. "+e.getMessage());
        }
    }
}
