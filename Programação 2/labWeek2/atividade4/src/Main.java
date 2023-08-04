import Animais.*;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Jogador jogador = new Jogador("Arthur");
        Scanner read = new Scanner(System.in);
        byte playerLevel;

        System.out.println("Bem vindo "+jogador.getNome()+". Qual o nível de seu personagem?");
        playerLevel = read.nextByte();


        try {
            switch (playerLevel) {
                case 1 -> {
                    Gato gato = new Gato("Gato");
                    jogador.addMascotesAtivos(gato);
                    jogador.mostrarMascotes();
                }
                case 2 -> {
                    Pato pato = new Pato("Pato");
                    jogador.addMascotesAtivos(pato);
                    jogador.mostrarMascotes();
                }
                case 3 -> {
                    Cobra cobra = new Cobra("Cobra");
                    jogador.addMascotesAtivos(cobra);
                    jogador.mostrarMascotes();
                }
                case 4 -> {
                    Morcego morcego = new Morcego("Morcego");
                    jogador.addMascotesAtivos(morcego);
                    jogador.mostrarMascotes();
                }
                case 5 -> {
                    Falcao falcao = new Falcao("Falcão");
                    jogador.addMascotesAtivos(falcao);
                    jogador.mostrarMascotes();
                }
                case 6 -> {
                     Lagarto lagarto = new Lagarto("Lagarto");
                     jogador.addMascotesAtivos(lagarto);
                     jogador.mostrarMascotes();
                }
                case 10 -> {
                    Falcao falcao = new Falcao("Falcão");
                    Pato pato = new Pato("Pato");
                    jogador.addMascotesAtivos(falcao);
                    jogador.addMascotesAtivos(pato);
                    jogador.mostrarMascotes();
                }
            }
        } catch (Exception e){
            System.out.println("Something went wrong.");
        }
    }
}
