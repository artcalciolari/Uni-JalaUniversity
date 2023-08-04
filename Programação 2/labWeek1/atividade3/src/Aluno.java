import java.util.List;

public class Aluno {
    private String name;
    private int nota;
    private List<String> cursos;

    public Aluno(String name, int nota, List<String> cursos) {
        this.name = name;
        this.nota = nota;
        this.cursos = cursos;
    }

    @Override
    public String toString() {
        return "The name is: " +name+ ", the grade is: " +nota+ ", and the course is: " +cursos;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public List<String> getCursos() {
        return cursos;
    }

    public void addCurso(String curso) {
        cursos.add(curso);
    }
}
