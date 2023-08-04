package Cartoes;

import Contas.ContaCorrente;


public class CartaoCredito implements ICartoes {
    ContaCorrente contaCorrente;

    public CartaoCredito(ContaCorrente contaCorrente) {
        this.contaCorrente = contaCorrente;
    }

    @Override
    public void realizarOperacao(int numConta, int numCartao) {
        if (numConta != contaCorrente.checarConta() && numCartao != getNumCartao()) {
            System.out.println("Número da conta incorreto. Tente Novamente.");
        } else {
            int quantiaSaque = contaCorrente.getQuantiaSaque();
            int creditoLiberado = 10000;
            System.out.println("Limite da conta após saque: " + (creditoLiberado - quantiaSaque));
            System.out.println("Você sacou: " + quantiaSaque);
        }
    }

    public int getNumCartao() {
        return 8802555;
    }
}
