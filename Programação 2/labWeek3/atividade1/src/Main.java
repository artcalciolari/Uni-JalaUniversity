import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Deck deck = new Deck();

        Card.Suit[] naipesComputador = Card.Suit.values();
        Card.Suit[] naipesJogador = Card.Suit.values();

        Card.Suit naipeComputador = naipesComputador[deck.random.nextInt(naipesComputador.length)];
        Card.Suit naipeJogador = naipesJogador[deck.random.nextInt(naipesJogador.length)];

        String cartaComputador = deck.cartasComputador();
        String cartaJogador = deck.cartasJogador();

        try {
            System.out.println("As cartas do computador são: " + naipeComputador.getAbreviacao() + cartaComputador);
            System.out.println("As cartas do jogador são: " + naipeJogador.getAbreviacao() + cartaJogador);

            Map<String, Integer> valoresCartas = new HashMap<>();
            valoresCartas.put("2", 1);
            valoresCartas.put("3", 2);
            valoresCartas.put("4", 3);
            valoresCartas.put("5", 4);
            valoresCartas.put("6", 5);
            valoresCartas.put("7", 6);
            valoresCartas.put("8", 7);
            valoresCartas.put("9", 8);
            valoresCartas.put("10", 9);
            valoresCartas.put("J", 10);
            valoresCartas.put("Q", 11);
            valoresCartas.put("K", 12);
            valoresCartas.put("A", 13);

            int valorComputador = valoresCartas.get(cartaComputador);
            int valorJogador = valoresCartas.get(cartaJogador);

            System.out.println("GANHOU OU PERDEU?");
            Thread.sleep(2500);

            if (valorComputador > valorJogador) {
                System.out.println("PERDEU!");
            } else if (valorJogador > valorComputador) {
                System.out.println("GANHOU!");
            } else {
                System.out.println("EMPATE!");
            }
        } catch (Exception e) {
            System.out.println("Algo de errado aconteceu.");
        }
    }
}
