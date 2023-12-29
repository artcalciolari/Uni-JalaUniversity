package CalciolariPastaPizza;

import java.sql.Connection;
import java.sql.SQLException;

import static CalciolariPastaPizza.dbConnection.ConnectionFactory.getConnection;
import static CalciolariPastaPizza.handlers.EstoqueGeralHandler.showEstoqueMenu;

public class Main {
    public static void main(String[] args) {
        try (Connection c = getConnection()) {
            if (c != null) {
                System.out.println("Conexão estabelecida!");
                showEstoqueMenu();
            } else {
                System.out.println("Erro de conexão. Tente novamente.");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}