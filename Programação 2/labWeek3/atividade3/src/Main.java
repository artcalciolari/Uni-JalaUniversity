public class Main {
    public static void main(String[] args) {
        Titular titular = new Titular(MATERIAS.CIENCIAS);
        titular.teach();

        Substituto substituto = new Substituto(MATERIAS.MATEMATICA);
        substituto.teach();

        substituto.assign(MATERIAS.MUSICA);
        substituto.teach();
    }
}
