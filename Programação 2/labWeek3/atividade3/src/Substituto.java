public class Substituto implements Professor {

    private MATERIAS materiaAtual;

    public Substituto(MATERIAS materiaAtual) {
        this.materiaAtual = materiaAtual;
    }

    @Override
    public void teach() {
        System.out.println("O professor substituto ensina: " + materiaAtual.getNome());
    }

    public void assign(MATERIAS materias) {
        materiaAtual = materias;
    }
}
