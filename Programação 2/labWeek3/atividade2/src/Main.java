import Cartoes.CartaoCredito;
import Cartoes.CartaoDebito;
import Cartoes.CartaoPrePago;
import Contas.ContaCorrente;
import Contas.ContaFixa;
import Contas.ContaTemporaria;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);
        System.out.println("""
                Insira sua opção desejada:\s
                1. Criar conta corrente
                2. Criar conta fixa
                3. Criar conta temporária
                ↓\
                """);
        byte userInput = read.nextByte();

        try {
            switch (userInput) {
                case 1 -> {
                    ContaCorrente contaCorrente = new ContaCorrente(5000);
                    CartaoCredito cartaoCredito = new CartaoCredito(contaCorrente);

                    System.out.println("A sua conta corrente foi criada com o seguinte núm.: " + contaCorrente.checarConta());
                    System.out.println("E o núm. de seu cartão é o seguinte: " + cartaoCredito.getNumCartao());

                    System.out.println("Aguarde...");
                    Thread.sleep(1500);

                    System.out.println("Favor informar o núm. da conta: ");
                    int numContaCredito = read.nextInt();
                    System.out.println("Agora, o núm. de seu cartão: ");
                    int numCartaoCredito = read.nextInt();

                    cartaoCredito.realizarOperacao(numContaCredito, numCartaoCredito);
                }
                case 2 -> {
                    ContaFixa contaFixa = new ContaFixa(6000);
                    CartaoDebito cartaoDebito = new CartaoDebito(contaFixa);

                    System.out.println("A sua conta poupança(fixa) foi criada com o seguinte núm.: " + contaFixa.checarConta());
                    System.out.println("E o núm. de seu cartão é o seguinte: " + cartaoDebito.getNumCartao());

                    System.out.println("Aguarde...");
                    Thread.sleep(1500);

                    System.out.println("Favor informar o núm. da conta: ");
                    int numContaFixa = read.nextInt();
                    System.out.println("Agora, o núm. de seu cartão: ");
                    int numCartaoDebito = read.nextInt();

                    cartaoDebito.realizarOperacao(numContaFixa, numCartaoDebito);
                }
                case 3 -> {
                    ContaTemporaria contaTemporaria = new ContaTemporaria(3000);
                    CartaoPrePago cartaoPrePago = new CartaoPrePago(contaTemporaria);

                    System.out.println("A sua conta temporária foi criada com o seguinte núm.: " + contaTemporaria.checarConta());
                    System.out.println("E o núm. de seu cartão é o seguinte: " + cartaoPrePago.getNumCartao());

                    System.out.println("Aguarde...");
                    Thread.sleep(1500);

                    System.out.println("Favor informar o núm. da conta: ");
                    int numContaTemp = read.nextInt();
                    System.out.println("Agora, o núm. de seu cartão: ");
                    int numCartaoPrePago = read.nextInt();

                    cartaoPrePago.realizarOperacao(numContaTemp, numCartaoPrePago);
                }
            }
        } catch (Exception e) {
            System.out.println("Algo deu errado.");
        }

    }
}
