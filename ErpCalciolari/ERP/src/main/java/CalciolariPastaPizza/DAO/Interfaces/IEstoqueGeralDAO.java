package CalciolariPastaPizza.DAO.Interfaces;

import CalciolariPastaPizza.entities.EstoqueGeral;

import java.util.List;
import java.util.Optional;

public interface IEstoqueGeralDAO {
    void updateTable(EstoqueGeral estoqueGeral);
    List<EstoqueGeral> findAll();
    Optional<EstoqueGeral> findByID(int codigo_massa);
}
