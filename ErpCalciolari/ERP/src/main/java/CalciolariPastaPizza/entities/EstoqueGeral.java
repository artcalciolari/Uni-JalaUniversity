package CalciolariPastaPizza.entities;

public class EstoqueGeral {
    private int codigo_massa;
    private String nome_massa, recheio, refrigeracao;
    private int quantia;

    public EstoqueGeral(int codigo_massa, String nome_massa, String recheio, String refrigeracao, int quantia) {
        this.codigo_massa = codigo_massa;
        this.nome_massa = nome_massa;
        this.recheio = recheio;
        this.refrigeracao = refrigeracao;
        this.quantia = quantia;
    }
    public int getCodigo_massa() {
        return codigo_massa;
    }

    public void setCodigo_massa(int codigo_massa) {
        this.codigo_massa = codigo_massa;
    }

    public String getNome_massa() {
        return nome_massa;
    }

    public void setNome_massa(String nome_massa) {
        this.nome_massa = nome_massa;
    }

    public String getRecheio() {
        return recheio;
    }

    public void setRecheio(String recheio) {
        this.recheio = recheio;
    }

    public String getRefrigeracao() {
        return refrigeracao;
    }

    public void setRefrigeracao(String refrigeracao) {
        this.refrigeracao = refrigeracao;
    }

    public int getQuantia() {
        return quantia;
    }

    public void setQuantia(int quantia) {
        this.quantia = quantia;
    }
}
