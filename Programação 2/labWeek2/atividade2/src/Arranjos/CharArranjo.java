package Arranjos;

import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class CharArranjo extends Arranjo {
    List<Character> listaChar;

    public CharArranjo(List<Character> listaChar) {
        this.listaChar = listaChar;
    }

    @Override
    public void classificar() {
        Collections.sort(listaChar, Collections.reverseOrder());
    }
    public void inserirNum(List<Character> lista, Scanner read) {
        System.out.println("Quantos caracteres deseja adicionar?");
        int y = read.nextInt();

        for (int j = 0; j < y; j++){
            System.out.println("Insira o caractere de número "+(j+1)+":");
                char x = read.next().charAt(0);
                lista.add(x);
        }
    }

    public void removerNum(List<Character> lista, Scanner read) {
        System.out.println("Quantos caracteres deseja remover?");
        int k = read.nextInt();

        for (int l = 0; l < k; l++) {
            System.out.println("Insira o caractere que deseja remover: (lembre-se de informar o índice)\nIndice = posição do núm. -1");
            int x = read.nextInt();
            lista.remove(x);
        }
    }

    public List<Character> imprimirLista() {
        return listaChar;
    }
}
