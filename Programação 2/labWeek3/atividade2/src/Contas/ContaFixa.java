package Contas;

public class ContaFixa implements IConta {
    int quantiaSaque;

    public ContaFixa(int quantiaSaque) {
        this.quantiaSaque = quantiaSaque;
    }

    @Override
    public int checarConta() {
        return 8806;
    }

    public int getQuantiaSaque() {
        return quantiaSaque;
    }
}
