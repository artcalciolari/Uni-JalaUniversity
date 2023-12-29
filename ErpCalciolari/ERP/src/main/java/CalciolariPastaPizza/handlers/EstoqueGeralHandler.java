package CalciolariPastaPizza.handlers;

import CalciolariPastaPizza.DAO.EstoqueGeralDAO;
import CalciolariPastaPizza.entities.EstoqueGeral;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

public class EstoqueGeralHandler {
    static EstoqueGeralDAO dao = new EstoqueGeralDAO();
    static int userChoice = 0;

    public static void showEstoqueMenu() {
        Scanner read = new Scanner(System.in);

        while (userChoice != 4) {
            System.out.println("Pressione Enter para exibir o menu.");
            try {
                System.in.read(); // Aguarda a entrada do usuário
            } catch (IOException e) {
                e.printStackTrace();
            }

            System.out.print("""
                      _____           _          _           _                  _                \s
                     / ____|         | |        (_)         | |                (_)               \s
                    | |        __ _  | |   ___   _    ___   | |   __ _   _ __   _                \s
                    | |       / _` | | |  / __| | |  / _ \\  | |  / _` | | '__| | |               \s
                    | |____  | (_| | | | | (__  | | | (_) | | | | (_| | | |    | |               \s
                     \\_____|  \\__,_| |_|  \\___| |_|  \\___/  |_|  \\__,_| |_|    |_|               \s
                     _____                  _                      _____    _                    \s
                    |  __ \\                | |             ___    |  __ \\  (_)                   \s
                    | |__) |   __ _   ___  | |_    __ _   ( _ )   | |__) |  _   ____  ____   __ _\s
                    |  ___/   / _` | / __| | __|  / _` |  / _ \\/\\ |  ___/  | | |_  / |_  /  / _` |
                    | |      | (_| | \\__ \\ | |_  | (_| | | (_>  < | |      | |  / /   / /  | (_| |
                    |_|       \\__,_| |___/  \\__|  \\__,_|  \\___/\\/ |_|      |_| /___| /___|  \\__,_|
                                                                                                 \s
                                                                                                 \s
                                    
                    → Área destinada ao controle de estoque. É possível atualizar o banco de dados com novos produtos, caso necessário.
                    → Caso queira voltar para o menu principal, digite 4.
                                    
                    → Você tem as seguintes opções:
                    1. Consultar todas as massas de uma só vez
                    2. Consultar alguma massa específica utilizando o código da balança (Ex. 103 = Ravioli de mussarela.)
                    3. Atualizar o estoque
                    Escolha a opção desejada →\s""");
            userChoice = read.nextInt();

            switch (userChoice) {
                case 1 -> {
                    List<EstoqueGeral> searchAllEstoqueGeral = dao.findAll();

                    System.out.println();
                    System.out.printf("%-7s | %-10s | %-25s | %-12s | %-7s%n", "Código", "Nome", "Recheio", "Refrigeração", "Quantia Disponível");
                    System.out.println("-------------------------------------------------------------------------------------");
                    for (EstoqueGeral estoqueGeral : searchAllEstoqueGeral) {
                        System.out.printf("%-7d | %-10s | %-25s | %-12s | %-7d%n",
                                estoqueGeral.getCodigo_massa(),
                                estoqueGeral.getNome_massa(),
                                estoqueGeral.getRecheio(),
                                estoqueGeral.getRefrigeracao(),
                                estoqueGeral.getQuantia());
                    }

                    System.out.println();
                }
                case 2 -> {
                    System.out.print("Insira o código da massa desejada → ");
                    int codigoMassa = read.nextInt();

                    Optional<EstoqueGeral> estoqueOptional = dao.findByID(codigoMassa);

                    estoqueOptional.ifPresent(findSingleItem -> {
                        System.out.println();
                        System.out.printf("%-7s | %-10s | %-25s | %-12s | %-7s%n", "Código", "Nome", "Recheio", "Refrigeração", "Quantia Disponível");
                        System.out.println("---------------------------------------------------------------");
                        System.out.printf("%-7d | %-10s | %-25s | %-12s | %-7d%n",
                                findSingleItem.getCodigo_massa(),
                                findSingleItem.getNome_massa(),
                                findSingleItem.getRecheio(),
                                findSingleItem.getRefrigeracao(),
                                findSingleItem.getQuantia());
                        System.out.println();
                    });

                    if (estoqueOptional.isEmpty()) {
                        System.out.println("Nenhuma massa encontrada com o código " + codigoMassa);
                    }
                }
                case 3 -> {
                    System.out.print("Insira o código da massa cujo estoque será atualizado, e o novo estoque separado por um espaço. (Ex. 156 5750) → ");
                    int codigoMassa = read.nextInt();
                    int quantiaToUpdate = read.nextInt();

                    Optional<EstoqueGeral> estoqueLookup = dao.findByID(codigoMassa);
                    EstoqueGeral estoqueToUpdate = estoqueLookup.orElse(null);

                    if (estoqueToUpdate == null) {
                        System.out.println("Nenhuma massa encontrada com o código " + codigoMassa + ". Tente novamente.");
                        break;
                    }

                    estoqueToUpdate.setQuantia(quantiaToUpdate);
                    dao.updateTable(estoqueToUpdate);

                    System.out.println("Estoque atualizado com sucesso!");
                }
            }
        }

    }
}
