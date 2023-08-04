import java.util.ArrayList;
import java.util.List;

public class Universidade {
    List<Aluno> alunos = new ArrayList<>();

    public void addAluno(Aluno aluno) {
        alunos.add(aluno);
    }
    public void atribuirCurso(int indiceAluno, String curso) {
        Aluno aluno = alunos.get(indiceAluno);
        aluno.addCurso(curso);
    }
    public void atribuirNota(int indiceAluno, int notaNova) {
        Aluno aluno = alunos.get(indiceAluno);
        aluno.setNota(notaNova);
    }
    public List<Aluno> listarAlunosDoCurso(String curso) {
        List<Aluno> alunosDoCurso = new ArrayList<>();
        for (Aluno aluno : alunos) {
            if(aluno.getCursos().contains(curso)) {
                alunosDoCurso.add(aluno);
            }
        }
        return alunosDoCurso;
    }
    public void listarTodosAlunos() {
        for (Aluno aluno : alunos) {
            System.out.println(aluno);
        }
    }
}