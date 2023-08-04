public enum MATERIAS {
    CIENCIAS("Ciências"),
    MATEMATICA("Matemática"),
    MUSICA("Música"),
    GINASTICA("Ginástica");

    private String nome;

    MATERIAS(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
}



