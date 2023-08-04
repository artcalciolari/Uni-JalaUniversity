package Arranjos;

import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class ByteArranjo extends Arranjo {
    List<Byte> listaByte;

    public ByteArranjo(List<Byte> listaByte) {
        this.listaByte = listaByte;
    }

    @Override
    public void classificar() {
        Collections.sort(listaByte, Collections.reverseOrder());
    }
    public void inserirNum(List<Byte> lista, Scanner read) {
        System.out.println("Quantos números deseja adicionar?");
        int y = read.nextInt();

        for (int j = 0; j < y; j++){
            System.out.println("Insira a entrada de número "+(j+1)+":");
                byte x = read.nextByte();
                lista.add(x);
        }
    }

    public void removerNum(List<Byte> lista, Scanner read) {
        System.out.println("Quantos números deseja remover?");
        int k = read.nextInt();

        for (int l = 0; l < k; l++) {
            System.out.println("Insira o número que deseja remover: (lembre-se de informar o índice)\nIndice = posição do núm. -1");
            int x = read.nextInt();
            lista.remove(x);
        }
    }

    public List<Byte> imprimirLista() {
        return listaByte;
    }
}
