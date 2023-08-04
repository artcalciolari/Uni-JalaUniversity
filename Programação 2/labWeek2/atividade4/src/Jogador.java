import Animais.Mascotes;

import java.util.ArrayList;
import java.util.List;

public class Jogador {
    String nome;
    List<Mascotes> mascotesAtivos = new ArrayList<>();

    public Jogador(String nome) {
        this.nome = nome;
    }
    void addMascotesAtivos(Mascotes mascotes) {
        mascotesAtivos.add(mascotes);
    }
    void mostrarMascotes() {
        System.out.println("O jogador tem os seguinte(s) animal(is): \n"+mascotesAtivos);
    }

    public String getNome() {
        return nome;
    }
}
