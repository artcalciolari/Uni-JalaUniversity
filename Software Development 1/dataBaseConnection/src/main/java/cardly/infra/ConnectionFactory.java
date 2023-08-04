package cardly.infra;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

    private ConnectionFactory(){}

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/cardly", "root","2180");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}
