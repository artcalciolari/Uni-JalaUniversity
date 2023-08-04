package Cartoes;

import Contas.ContaTemporaria;

public class CartaoPrePago implements ICartoes {
    ContaTemporaria contaTemporaria;

    public CartaoPrePago(ContaTemporaria contaTemporaria) {
        this.contaTemporaria = contaTemporaria;
    }

    @Override
    public void realizarOperacao(int numConta, int numCartao) {
        if (numConta != contaTemporaria.checarConta() && numCartao != getNumCartao()) {
            System.out.println("Número da conta incorreto. Tente Novamente.");
        } else {
            System.out.println("O limite de seu cartão pré-pago é: " + contaTemporaria.getQuantiaCartao());
        }
    }

    public int getNumCartao() {
        return 6574128;
    }
}
