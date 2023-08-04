package Animais;

public class Cobra extends Mascotes {
    String nome;

    public Cobra(String nome) {
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
        return "[Uma cobra, com o nome: "+nome+". Suas capacidades são: rastejar]";
    }
}
