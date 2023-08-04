import java.util.List;

public class Main {
    public static void main(String[] args) {
        Universidade universidade = new Universidade();

        Aluno aluno1 = new Aluno("Gery",1, List.of("Induction"));
        universidade.addAluno(aluno1);

        Aluno aluno2 = new Aluno("Luis",2,List.of("Science","Database I"));
        universidade.addAluno(aluno2);

        Aluno aluno3 = new Aluno("Raul",1,List.of("Science", "Maths"));
        universidade.addAluno(aluno3);

        Aluno aluno4 = new Aluno("Liz",3,List.of("Maths"));
        universidade.addAluno(aluno4);

        universidade.atribuirNota(1,5);

        List<Aluno> alunosDoCurso = universidade.listarAlunosDoCurso("Science");
        System.out.println(alunosDoCurso);

//        universidade.listarTodosAlunos();

    }
}
