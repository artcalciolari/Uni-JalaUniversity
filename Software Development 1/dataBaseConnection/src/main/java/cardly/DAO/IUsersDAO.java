package cardly.DAO;

import cardly.model.Users;

import java.util.List;
import java.util.Optional;

public interface IUsersDAO {

    Users save(Users users);
    Users update(Users users);
    void delete(Integer user_id);
    List<Users> findAll();
    Optional<Users> findByID(Integer id);
}
