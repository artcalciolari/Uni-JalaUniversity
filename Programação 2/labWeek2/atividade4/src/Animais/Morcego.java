package Animais;

public class Morcego extends Mascotes {
    String nome;

    public Morcego(String nome) {
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
        return "[Um morcego, com o nome: "+nome+". Suas capacidades são: voar.]";
    }
}
