import Arranjos.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);
        byte userChoice;

        System.out.println("""
                Bem-vindo. Escolha sua opção desejada:
                1. Lista com números inteiros
                2. Lista com números float
                3. Lista com números double
                4. Lista com números byte
                5. Lista com números short
                6. Lista com números long
                7. Lista com caracteres char
                ↓\
                """);
        userChoice = read.nextByte();

        try {
            switch (userChoice) {
                case 1 -> {
                    List<Integer> listaInt = new ArrayList<>();

                    System.out.println("Insira o tamanho da lista: ");
                    int tamanhoListaInt = read.nextInt();

                    for(int i = 0; i < tamanhoListaInt; i++) {
                        System.out.println("Insira a entrada de número "+(i+1)+":");
                        int inputInt = read.nextInt();
                        listaInt.add(inputInt);
                    }
                    System.out.println("A lista de inteiros após inserção é: "+listaInt);

                    System.out.println("Deseja INSERIR algum item? [S/N]");
                    String i = read.next().toUpperCase();

                    System.out.println("Deseja REMOVER algum item? [S/N]");
                    String r = read.next().toUpperCase();

                    IntArranjo intArray = new IntArranjo(listaInt);
                    intArray.classificar();
                    System.out.println("A lista de inteiros após ordenação é esta: "+intArray.imprimirLista());

                    if (i.contains("S")) {
                        intArray.inserirNum(listaInt, read);
                        intArray.classificar();
                        System.out.println("A lista de inteiros após inserção é esta: "+intArray.imprimirLista());
                    }
                    if (r.contains("S")) {
                        intArray.removerNum(listaInt, read);
                        intArray.classificar();
                        System.out.println("A lista de inteiros após remoção é esta: "+intArray.imprimirLista());
                    }
                }
                case 2 -> {
                    List<Float> listaFloat = new ArrayList<>();

                    System.out.println("Insira o tamanho da lista: ");
                    int tamanhoListaFloat = read.nextInt();

                    for(int i = 0; i < tamanhoListaFloat; i++) {
                        System.out.println("Insira a entrada de número "+(i+1)+":");
                        float inputFloat = read.nextFloat();
                        listaFloat.add(inputFloat);
                    }
                    System.out.println("A lista de floats após inserção é: "+listaFloat);

                    System.out.println("Deseja INSERIR algum item? [S/N]");
                    String i = read.next().toUpperCase();

                    System.out.println("Deseja REMOVER algum item? [S/N]");
                    String r = read.next().toUpperCase();

                    FloatArranjo floatArray = new FloatArranjo(listaFloat);
                    floatArray.classificar();
                    System.out.println("A lista de floats após ordenação é esta: "+floatArray.imprimirLista());

                    if (i.contains("S")) {
                        floatArray.inserirNum(listaFloat, read);
                        floatArray.classificar();
                        System.out.println("A lista de floats após inserção é esta: "+floatArray.imprimirLista());
                    }
                    if (r.contains("S")) {
                        floatArray.removerNum(listaFloat, read);
                        floatArray.classificar();
                        System.out.println("A lista de floats após remoção é esta: "+floatArray.imprimirLista());
                    }
                }
                case 3 -> {
                    List<Double> listaDouble = new ArrayList<>();

                    System.out.println("Insira o tamanho da lista: ");
                    int tamanhoListaDouble = read.nextInt();

                    for(int i = 0; i < tamanhoListaDouble; i++) {
                        System.out.println("Insira a entrada de número "+(i+1)+":");
                        double inputDouble = read.nextDouble();
                        listaDouble.add(inputDouble);
                    }
                    System.out.println("A lista de doubles após inserção é: "+listaDouble);

                    System.out.println("Deseja INSERIR algum item? [S/N]");
                    String i = read.next().toUpperCase();

                    System.out.println("Deseja REMOVER algum item? [S/N]");
                    String r = read.next().toUpperCase();

                    DoubleArranjo doubleArray = new DoubleArranjo(listaDouble);
                    doubleArray.classificar();
                    System.out.println("A lista de doubles após ordenação é esta: "+doubleArray.imprimirLista());

                    if (i.contains("S")) {
                        doubleArray.inserirNum(listaDouble, read);
                        doubleArray.classificar();
                        System.out.println("A lista de doubles após inserção é esta: "+doubleArray.imprimirLista());
                    }
                    if (r.contains("S")) {
                        doubleArray.removerNum(listaDouble, read);
                        doubleArray.classificar();
                        System.out.println("A lista de doubles após remoção é esta: "+doubleArray.imprimirLista());
                    }
                }
                case 4 -> {
                    List<Byte> listaByte = new ArrayList<>();

                    System.out.println("Insira o tamanho da lista: ");
                    int tamanhoListaByte = read.nextInt();

                    for(int i = 0; i < tamanhoListaByte; i++) {
                        System.out.println("Insira a entrada de número "+(i+1)+":");
                        byte inputByte = read.nextByte();
                        listaByte.add(inputByte);
                    }
                    System.out.println("A lista de bytes após inserção é: "+listaByte);

                    System.out.println("Deseja INSERIR algum item? [S/N]");
                    String i = read.next().toUpperCase();

                    System.out.println("Deseja REMOVER algum item? [S/N]");
                    String r = read.next().toUpperCase();

                    ByteArranjo byteArray = new ByteArranjo(listaByte);
                    byteArray.classificar();
                    System.out.println("A lista de doubles após ordenação é esta: "+byteArray.imprimirLista());

                    if (i.contains("S")) {
                        byteArray.inserirNum(listaByte, read);
                        byteArray.classificar();
                        System.out.println("A lista de bytes após inserção é esta: "+byteArray.imprimirLista());
                    }
                    if (r.contains("S")) {
                        byteArray.removerNum(listaByte, read);
                        byteArray.classificar();
                        System.out.println("A lista de bytes após remoção é esta: "+byteArray.imprimirLista());
                    }
                }
                case 5 -> {
                    List<Short> listaShort = new ArrayList<>();

                    System.out.println("Insira o tamanho da lista: ");
                    int tamanhoListaShort = read.nextInt();

                    for(int i = 0; i < tamanhoListaShort; i++) {
                        System.out.println("Insira a entrada de número "+(i+1)+":");
                        short inputShort = read.nextShort();
                        listaShort.add(inputShort);
                    }
                    System.out.println("A lista de shorts após inserção é: "+listaShort);

                    System.out.println("Deseja INSERIR algum item? [S/N]");
                    String i = read.next().toUpperCase();

                    System.out.println("Deseja REMOVER algum item? [S/N]");
                    String r = read.next().toUpperCase();

                    ShortArranjo shortArray = new ShortArranjo(listaShort);
                    shortArray.classificar();
                    System.out.println("A lista de shorts após ordenação é esta: "+shortArray.imprimirLista());

                    if (i.contains("S")) {
                        shortArray.inserirNum(listaShort, read);
                        shortArray.classificar();
                        System.out.println("A lista de shorts após inserção é esta: "+shortArray.imprimirLista());
                    }
                    if (r.contains("S")) {
                        shortArray.removerNum(listaShort, read);
                        shortArray.classificar();
                        System.out.println("A lista de shorts após remoção é esta: "+shortArray.imprimirLista());
                    }
                }
                case 6 -> {
                    List<Long> listaLong = new ArrayList<>();

                    System.out.println("Insira o tamanho da lista: ");
                    int tamanhoListaLong = read.nextInt();

                    for(int i = 0; i < tamanhoListaLong; i++) {
                        System.out.println("Insira a entrada de número "+(i+1)+":");
                        long inputLong = read.nextShort();
                        listaLong.add(inputLong);
                    }
                    System.out.println("A lista de longs após inserção é: "+listaLong);

                    System.out.println("Deseja INSERIR algum item? [S/N]");
                    String i = read.next().toUpperCase();

                    System.out.println("Deseja REMOVER algum item? [S/N]");
                    String r = read.next().toUpperCase();

                    LongArranjo longArray = new LongArranjo(listaLong);
                    longArray.classificar();
                    System.out.println("A lista de longs após ordenação é esta: "+longArray.imprimirLista());

                    if (i.contains("S")) {
                        longArray.inserirNum(listaLong, read);
                        longArray.classificar();
                        System.out.println("A lista de longs após inserção é esta: "+longArray.imprimirLista());
                    }
                    if (r.contains("S")) {
                        longArray.removerNum(listaLong, read);
                        longArray.classificar();
                        System.out.println("A lista de longs após remoção é esta: "+longArray.imprimirLista());
                    }
                }
                case 7 -> {
                    List<Character> listaChar = new ArrayList<>();

                    System.out.println("Insira o tamanho da lista: ");
                    int tamanhoListaChar = read.nextInt();

                    for(int i = 0; i < tamanhoListaChar; i++) {
                        System.out.println("Insira o caractere de número "+(i+1)+":");
                        char inputLong = read.next().charAt(0);
                        listaChar.add(inputLong);
                    }
                    System.out.println("A lista de chars após inserção é: "+listaChar);

                    System.out.println("Deseja INSERIR algum item? [S/N]");
                    String i = read.next().toUpperCase();

                    System.out.println("Deseja REMOVER algum item? [S/N]");
                    String r = read.next().toUpperCase();

                    CharArranjo charArray = new CharArranjo(listaChar);
                    charArray.classificar();
                    System.out.println("A lista de chars após ordenação é esta: "+charArray.imprimirLista());

                    if (i.contains("S")) {
                        charArray.inserirNum(listaChar, read);
                        charArray.classificar();
                        System.out.println("A lista de chars após inserção é esta: "+charArray.imprimirLista());
                    }
                    if (r.contains("S")) {
                        charArray.removerNum(listaChar, read);
                        charArray.classificar();
                        System.out.println("A lista de chars após remoção é esta: "+charArray.imprimirLista());
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Something went wrong");
        }
    }
}
