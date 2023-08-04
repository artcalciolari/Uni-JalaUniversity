package Animais;

public class Lagarto extends Mascotes {
    String nome;

    public Lagarto(String nome) {
        this.nome = nome;
    }

    @Override
    String comer() {
        return null;
    }

    @Override
    String dormir() {
        return null;
    }

    @Override
    String treinar() {
        return null;
    }

    @Override
    public String toString() {
        return "[Um lagarto, com o nome: "+nome+". Suas capacidades são: rastejar e correr.]";
    }
}
