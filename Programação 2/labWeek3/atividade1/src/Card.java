public class Card {
    enum Suit {
        PAUS("P"),
        OURO("O"),
        COPAS("C"),
        ESPADA("E");

        private final String abreviacao;

        Suit(String abreviacao) {
            this.abreviacao = abreviacao;
        }

        public String getAbreviacao() {
            return abreviacao;
        }
    }
}
