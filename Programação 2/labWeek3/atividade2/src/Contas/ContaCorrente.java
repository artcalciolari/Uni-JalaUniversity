package Contas;

public class ContaCorrente implements IConta {
    int quantiaSaque;

    public ContaCorrente(int quantiaSaque) {
        this.quantiaSaque = quantiaSaque;
    }

    @Override
    public int checarConta() {
        return 5502;
    }

    public int getQuantiaSaque() {
        return quantiaSaque;
    }
}