package CalciolariPastaPizza.DAO;

import CalciolariPastaPizza.DAO.Interfaces.IEstoqueGeralDAO;
import CalciolariPastaPizza.entities.EstoqueGeral;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static CalciolariPastaPizza.dbConnection.ConnectionFactory.getConnection;

public class EstoqueGeralDAO implements IEstoqueGeralDAO {
    @Override
    public void updateTable(EstoqueGeral estoqueGeral) {
        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(
                """
                        UPDATE estoque_geral SET quantia = ? WHERE codigo_massa = ?
                        """)) {

            ps.setInt(1, estoqueGeral.getQuantia());
            ps.setInt(2, estoqueGeral.getCodigo_massa());

            int rowsAffected = ps.executeUpdate();

            if (rowsAffected == 0) {
                System.out.println("Nenhum dado foi atualizado. Tente novamente.");
            }

        } catch (SQLException e) {
            throw new RuntimeException("Algo deu errado ao atualizar os dados. Tente novamente.", e);
        }
    }

    @Override
    public List<EstoqueGeral> findAll() {
        List<EstoqueGeral> estoqueGeralList = new ArrayList<>();

        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(
                """
                        SELECT codigo_massa, nome_massa, recheio, refrigeracao, quantia FROM estoque_geral
                        """)) {

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                int codigo_massa = rs.getInt("codigo_massa");
                String nome_massa = rs.getString("nome_massa");
                String recheio = rs.getString("recheio");
                String refrigeracao = rs.getString("refrigeracao");
                int quantia = rs.getInt("quantia");

                estoqueGeralList.add(new EstoqueGeral(codigo_massa, nome_massa, recheio, refrigeracao, quantia));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Algo deu errado ao pesquisar o banco de dados. Provavelmente você inseriu algum dado incorretamente.\nTente novamente.", e);
        }
        return estoqueGeralList;
    }

    @Override
    public Optional<EstoqueGeral> findByID(int codigo_massa) {
        EstoqueGeral estoqueGeral = null;

        try (Connection c = getConnection(); PreparedStatement ps = c.prepareStatement(
                """
                        SELECT codigo_massa, nome_massa, recheio, refrigeracao, quantia FROM estoque_geral WHERE codigo_massa = ?
                        """)) {
            ps.setInt(1, codigo_massa);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int PK = rs.getInt("codigo_massa");
                    String nome_massa = rs.getString("nome_massa");
                    String recheio = rs.getString("recheio");
                    String refrigeracao = rs.getString("refrigeracao");
                    int quantia = rs.getInt("quantia");

                    estoqueGeral = new EstoqueGeral(PK, nome_massa, recheio, refrigeracao, quantia);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Algo deu errado ao pesquisar o banco de dados. Tenha certeza em usar os códigos corretos. \nEx: 103 = Ravioli de mussarela", e);
        }
        return Optional.ofNullable(estoqueGeral);
    }
}
