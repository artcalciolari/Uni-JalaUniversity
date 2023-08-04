public class Titular implements Professor {

    private MATERIAS materiaAtual;

    public Titular(MATERIAS materiaAtual) {
        this.materiaAtual = materiaAtual;
    }
    @Override
    public void teach() {
        System.out.println("O professor titular ensina: " + materiaAtual.getNome());
    }
}
