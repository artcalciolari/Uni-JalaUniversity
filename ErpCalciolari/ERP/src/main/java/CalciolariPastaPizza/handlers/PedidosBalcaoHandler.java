package CalciolariPastaPizza.handlers;

import CalciolariPastaPizza.DAO.PedidosBalcaoDAO;

import java.io.IOException;
import java.util.Scanner;

public class PedidosBalcaoHandler {
    static PedidosBalcaoDAO dao = new PedidosBalcaoDAO();
    static int userChoice = 0;

    public static void showPedidosMenu() {
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
                                                                                                 
                    → Área destinada a consulta de pedidos.
                    → Caso queira voltar para o menu principal, digite 4.""");
        }
    }
}
