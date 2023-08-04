import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        byte userChoice;
        Scanner read = new Scanner(System.in);

        System.out.println("""
                Insira sua opção desejada
                1. Tocar instrumentos em sequência
                2. tocar um Instrumento específico:
                [Flauta - 0] [Trompete - 1] [Pratos - 2] [Tambor - 3] [Violino - 4] [Violão - 5]
                ↓\
                """);
        userChoice = read.nextByte();

        try {
            Orquestra orquestra= new Orquestra();

            Flauta flauta = new Flauta();
            Trompete trompete = new Trompete();
            Pratos pratos = new Pratos();
            Tambor tambor = new Tambor();
            Violino violino = new Violino();
            Violao violao = new Violao();

            orquestra.addToList(flauta);
            orquestra.addToList(trompete);
            orquestra.addToList(pratos);
            orquestra.addToList(tambor);
            orquestra.addToList(violino);
            orquestra.addToList(violao);

            switch (userChoice) {
                case 1 -> orquestra.playInstruments();
                case 2 -> {
                    System.out.println("Insira o índice desejado: ");
                    byte instrumentChoice = read.nextByte();
                    orquestra.playIndexInstruments(instrumentChoice);
                }
            }

        } catch (Exception e) {
            System.out.print("Something went wrong.");
        }
    }
}