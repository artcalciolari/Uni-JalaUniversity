public class Alunos {
    private int matricula, telefone, numero_de_faltas;
    private double nota1, nota2, nota3, media;
    private String nome, email, curso, endereco;
    private double[] vector;

    public Alunos(int matricula, int telefone, int numero_de_faltas, double media, double nota1, double nota2, double nota3, String nome, String email, String curso, String endereco, double[] vector)
    {
        this.matricula = matricula;
        this.telefone = telefone;
        this.numero_de_faltas = numero_de_faltas;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.media = media;
        this.nome = nome;
        this.email = email;
        this.curso = curso;
        this.endereco = endereco;
        this.vector = vector;
    }

    public void printBonito(String nome, int matricula, int telefone, String email, String endereco, String curso, int numero_de_faltas, double[] vector){
        System.out.println(" ----------------------------------------Alumni Data--------------------------------------------------");
        System.out.println("The alumni: "+nome);
        System.out.println("That has a school enrollment number of: "+matricula);
        System.out.println("Has the phone number: "+telefone+" the e-mail: "+email+", and lives on: "+endereco);
        System.out.println("Studies: "+curso);
        System.out.println("Has "+numero_de_faltas+" absences");
        System.out.println("Got "+vector[0]+" on the first test, "+vector[1]+" on the second one and "+vector[2]+" on the third.");
        aprovacao();
        System.out.println(" -----------------------------------------------------------------------------------------------------");

    }
    public void lancamentoFaltas(int numero_de_faltas){
        setNumero_de_faltas(numero_de_faltas);
    }

    public void lancamentoNotas(double nota1, double nota2, double nota3){
        setVector(nota1, nota2, nota3);
        media = (nota1+nota2+nota3)/3;
    }

    public void aprovacao(){
        if(media >=7 && numero_de_faltas <=15){
            System.out.println(nome+" Has passed.");
        }else if(media>=5 && media <=70 && numero_de_faltas <15){
            System.out.println(nome+" is under school catch-up on this course.");
        }else{
            System.out.println("Unfortunately, " +nome+ " failed the course");
        }
    }

    public int getMatricula() {
        return matricula;
    }

    public void setMatricula(int matricula) {
        this.matricula = matricula;
    }

    public int getTelefone() {
        return telefone;
    }

    public void setTelefone(int telefone) {
        this.telefone = telefone;
    }

    public int getNumero_de_faltas() {
        return numero_de_faltas;
    }

    public void setNumero_de_faltas(int numero_de_faltas) {
        this.numero_de_faltas = numero_de_faltas;
    }

    public double getNota1() {
        return nota1;
    }

    public void setNota1(int nota1) {
        this.nota1 = nota1;
    }

    public double    getNota2() {
        return nota2;
    }

    public void setNota2(int nota2) {
        this.nota2 = nota2;
    }

    public double getNota3() {
        return nota3;
    }

    public void setNota3(int nota3) {
        this.nota3 = nota3;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public double[] getVector() {
        return vector;
    }

    public void setVector(double[] vector) {
        this.vector = vector;
    }
    public void setVector(double nota1, double nota2, double nota3){
        vector[0] = nota1;
        vector[1] = nota2;
        vector[2] = nota3;
    }
}