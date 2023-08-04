package Animais;

public class Falcao extends Mascotes {
    String nome;

    public Falcao(String nome) {
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
        return "[Um falcão, com o nome: "+nome+". Suas capacidades são: andar e voar.]";
    }
}
