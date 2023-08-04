package Arranjos;

import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class ShortArranjo extends Arranjo {
    List<Short> listaShort;

    public ShortArranjo(List<Short> listaShort) {
        this.listaShort = listaShort;
    }

    @Override
    public void classificar() {
        Collections.sort(listaShort, Collections.reverseOrder());
    }
    public void inserirNum(List<Short> lista, Scanner read) {
        System.out.println("Quantos números deseja adicionar?");
        int y = read.nextInt();

        for (int j = 0; j < y; j++){
            System.out.println("Insira a entrada de número "+(j+1)+":");
                short x = read.nextShort();
                lista.add(x);
        }
    }

    public void removerNum(List<Short> lista, Scanner read) {
        System.out.println("Quantos números deseja remover?");
        int k = read.nextInt();

        for (int l = 0; l < k; l++) {
            System.out.println("Insira o número que deseja remover: (lembre-se de informar o índice)\nIndice = posição do núm. -1");
            int x = read.nextInt();
            lista.remove(x);
        }
    }

    public List<Short> imprimirLista() {
        return listaShort;
    }
}
