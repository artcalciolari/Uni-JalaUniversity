package Cartoes;

import Contas.ContaFixa;

public class CartaoDebito implements ICartoes {
    ContaFixa contaFixa;

    public CartaoDebito(ContaFixa contaFixa) {
        this.contaFixa = contaFixa;
    }

    @Override
    public void realizarOperacao(int numConta, int numCartao) {
        if (numConta != contaFixa.checarConta() && numCartao != getNumCartao()) {
            System.out.println("Número da conta incorreto. Tente Novamente.");
        } else {
            int quantiaSaque = contaFixa.getQuantiaSaque();
            int saldoConta = 10000;
            System.out.println("Limite da conta após saque: " + (saldoConta - quantiaSaque));
            System.out.println("Você Sacou: " + quantiaSaque);
        }
    }

    public int getNumCartao() {
        return 9975543;
    }
}
