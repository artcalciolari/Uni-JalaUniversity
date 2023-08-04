import java.util.Random;

public class Deck {
    final String[] cartas = new String[]{"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"};
    Random random = new Random();

    public String cartasComputador() {
        int indiceCartaComputador = random.nextInt(cartas.length);
        return cartas[indiceCartaComputador];
    }

    public String cartasJogador() {
        int indiceCartaJogador = random.nextInt(cartas.length);
        return cartas[indiceCartaJogador];
    }
}
