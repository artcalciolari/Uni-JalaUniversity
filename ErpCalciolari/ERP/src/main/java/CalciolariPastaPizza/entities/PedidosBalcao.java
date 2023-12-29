package CalciolariPastaPizza.entities;

public class PedidosBalcao {
    private int id_pedido;
    private String feito_em, entrega_em;
    private int codigo_massa, quantia;

    public PedidosBalcao(int id_pedido, String feito_em, String entrega_em, int codigo_massa, int quantia) {
        this.id_pedido = id_pedido;
        this.feito_em = feito_em;
        this.entrega_em = entrega_em;
        this.codigo_massa = codigo_massa;
        this.quantia = quantia;
    }

    public int getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(int id_pedido) {
        this.id_pedido = id_pedido;
    }

    public String getFeito_em() {
        return feito_em;
    }

    public void setFeito_em(String feito_em) {
        this.feito_em = feito_em;
    }

    public String getEntrega_em() {
        return entrega_em;
    }

    public void setEntrega_em(String entrega_em) {
        this.entrega_em = entrega_em;
    }

    public int getCodigo_massa() {
        return codigo_massa;
    }

    public void setCodigo_massa(int codigo_massa) {
        this.codigo_massa = codigo_massa;
    }

    public int getQuantia() {
        return quantia;
    }

    public void setQuantia(int quantia) {
        this.quantia = quantia;
    }
}
