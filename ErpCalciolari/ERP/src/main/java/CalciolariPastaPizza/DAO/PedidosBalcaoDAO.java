package CalciolariPastaPizza.DAO;

import CalciolariPastaPizza.DAO.Interfaces.IPedidosBalcao;
import CalciolariPastaPizza.entities.PedidosBalcao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static CalciolariPastaPizza.dbConnection.ConnectionFactory.getConnection;

public class PedidosBalcaoDAO implements IPedidosBalcao {
    @Override
    public void saveToTable(PedidosBalcao pedidosBalcao) {
        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(
                """
                        INSERT INTO pedidos_balcao (id_pedido, feito_em, entrega_em, codigo_massa, quantia) VALUES (?,?,?,?,?)
                        """)) {

            ps.setInt(1, pedidosBalcao.getId_pedido());
            ps.setString(2, pedidosBalcao.getFeito_em());
            ps.setString(3, pedidosBalcao.getEntrega_em());
            ps.setInt(4, pedidosBalcao.getCodigo_massa());
            ps.setInt(5, pedidosBalcao.getQuantia());

            int rowsAffected = ps.executeUpdate();

            if (rowsAffected == 0) {
                System.out.println("Nenhum dado inserido. Por favor, cheque os dados e insira-os novamente!");
            } else {
                System.out.println("Número de linhas alteradas: " + rowsAffected);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Nenhum dado foi inserido. Verifique se a conexão com o banco de dados foi estabelecida.\nTente novamente!", e);
        }
    }

    @Override
    public void updateTable(PedidosBalcao pedidosBalcao) {
        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(
                """
                        UPDATE pedidos_balcao SET entrega_em = ? WHERE id_pedido = ?
                        """)) {
            ps.setString(1, pedidosBalcao.getEntrega_em());
            ps.setInt(2, pedidosBalcao.getId_pedido());

            int rowsAffected = ps.executeUpdate();

            if (rowsAffected == 0) {
                System.out.println("Nenhum dado foi atualizado. Tente novamente!");
            } else {
                System.out.println("Número de linhas alteradas: " + rowsAffected);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Algo deu errado ao atualizar os dados. Tente novamente!", e);
        }
    }

    @Override
    public List<PedidosBalcao> findAll() {
        List<PedidosBalcao> pedidosBalcaoList = new ArrayList<>();

        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(
                """
                        SELECT (id_pedido, feito_em, entrega_em, codigo_massa, quantia) FROM pedidos_balcao
                        """)) {

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int idPedido = rs.getInt("id_pedido");
                String feitoEm = rs.getString("feito_em");
                String entrega_em = rs.getString("entrega_em");
                int codigoMassa = rs.getInt("codigo_massa");
                int quantia = rs.getInt("quantia");

                pedidosBalcaoList.add(new PedidosBalcao(idPedido, feitoEm, entrega_em, codigoMassa, quantia));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Algo deu errado ao pesquisar o banco de dados. Confira suas informações e tente novamente!");
        }
        return pedidosBalcaoList;
    }

    @Override
    public Optional<PedidosBalcao> findByID(int idPedido) {
        PedidosBalcao pedidosBalcao = null;
        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(
                """
                        SELECT id_pedido, feito_em, entrega_em, codigo_massa, quantia FROM pedidos_balcao WHERE id_pedido = ?
                        """)) {
            ps.setInt(1, idPedido);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int PK = rs.getInt("id_pedido");
                    String feitoEm = rs.getString("feito_em");
                    String entrega_em = rs.getString("entrega_em");
                    int codigoMassa = rs.getInt("codigo_massa");
                    int quantia = rs.getInt("quantia");

                    pedidosBalcao = new PedidosBalcao(PK, feitoEm, entrega_em, codigoMassa, quantia);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Algo deu errado ao pesquisar o banco de dados. Tenha certeza em usar os códigos corretos.", e);
        }
        return Optional.ofNullable(pedidosBalcao);
    }
}
