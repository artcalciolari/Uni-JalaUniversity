package Contas;

public class ContaTemporaria implements IConta {

    int quantiaCartao;

    public ContaTemporaria(int quantiaCartao) {
        this.quantiaCartao = quantiaCartao;
    }

    @Override
    public int checarConta() {
        return 6478;
    }

    public int getQuantiaCartao() {
        return quantiaCartao;
    }
}
