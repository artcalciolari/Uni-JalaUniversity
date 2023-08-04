package Animais;

public class Pato extends Mascotes {
    String nome;

    public Pato(String nome) {
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
        return "[Um pato, com o nome: "+nome+". Suas capacidades são: andar, voar e nadar.]";
    }
}

