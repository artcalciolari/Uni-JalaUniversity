package cardly.DAO;

import cardly.infra.ConnectionFactory;
import cardly.model.Users;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public class UsersDAO implements IUsersDAO {


    @Override
    public Users save(Users users) {
        try (Connection connection = ConnectionFactory.getConnection()) {
            String sqlInsert = "INSERT INTO users (email, username, password) VALUES (?,?,?)";

            PreparedStatement preparedStatement = connection.prepareStatement(sqlInsert, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, users.getEmail());
            preparedStatement.setString(2, users.getUsername());
            preparedStatement.setString(3, users.getPassword());

            preparedStatement.executeUpdate(); //código para inserção de dados

            ResultSet resultSet = preparedStatement.getGeneratedKeys(); //código para recebermos
            resultSet.next();                                           //o ID gerado
                                                                        //pelo banco de dados
            Integer generatedID = resultSet.getInt(1);
            users.setUser_id(generatedID);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return users;
    }

    @Override
    public Users update(Users users) {
        try (Connection connection = ConnectionFactory.getConnection()) {
            String sqlUpdate = "UPDATE users SET email = ?, username = ?, password = ? WHERE user_id = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(sqlUpdate);
            preparedStatement.setString(1, users.getEmail());
            preparedStatement.setString(2, users.getUsername());
            preparedStatement.setString(3, users.getPassword());
            preparedStatement.setInt(4, users.getUser_id());

            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return users;
    }

    @Override
    public void delete(Integer user_id) {

        try (Connection connection = ConnectionFactory.getConnection()) {
            String sqlDelete = "DELETE FROM users WHERE user_id = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(sqlDelete);
            preparedStatement.setInt(1, user_id);

            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Users> findAll() {
        String sqlSelect = "SELECT user_id, email, username, password FROM users";

        List<Users> users = new ArrayList<>();

        try (Connection connection = ConnectionFactory.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sqlSelect);

            ResultSet resultset = preparedStatement.executeQuery();

            while (resultset.next()) {
                Integer id = resultset.getInt("user_id");
                String email = resultset.getString("email");
                String username = resultset.getString("username");
                String password = resultset.getString("password");

                Users user = new  Users(id, email, username, password);
                users.add(user);
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return users;
    }

    @Override
    public Optional<Users> findByID(Integer user_id) {
        String sqlWhereClause = "SELECT user_id, email, username, password FROM users WHERE user_id = ?";

        Users user = null;
        try (Connection connection = ConnectionFactory.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sqlWhereClause);
            preparedStatement.setInt(1, user_id);

            ResultSet resultset = preparedStatement.executeQuery();

            while (resultset.next()) {
                Integer pKey = resultset.getInt("user_id");
                String email = resultset.getString("email");
                String username = resultset.getString("username");
                String password = resultset.getString("password");

                user = new  Users(pKey, email, username, password);
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return Optional.ofNullable(user);
    }

}
