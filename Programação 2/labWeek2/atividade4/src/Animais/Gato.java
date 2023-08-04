package Animais;

public class Gato extends Mascotes {
    String nome;

    public Gato(String nome) {
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
        return "[Um gato, com o nome: "+nome+". Suas capacidades são: andar e correr.]";
    }
}
