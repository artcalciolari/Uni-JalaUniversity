package CalciolariPastaPizza.DAO.Interfaces;


import CalciolariPastaPizza.entities.PedidosBalcao;

import java.util.List;
import java.util.Optional;

public interface IPedidosBalcao {
    void saveToTable(PedidosBalcao pedidosBalcao);
    void updateTable(PedidosBalcao pedidosBalcao);
    List<PedidosBalcao> findAll();
    Optional<PedidosBalcao> findByID(int codigo_massa);
}
