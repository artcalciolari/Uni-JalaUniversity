import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner read = new Scanner(System.in);

        int matricula, telefone, numero_de_faltas;

        double nota1, nota2, nota3, media = 0;

        String nome, email, curso, endereco;

        double[] vector = new double[3];

        try {

            System.out.println("Welcome to the SchoolHelp app!");

            System.out.println("Insert the alumni name: ");
            nome = read.nextLine();
            System.out.println("Insert "+nome+"'s school enrollment number: ");
            matricula = Integer.parseInt(read.nextLine());

            System.out.println("Insert "+nome+"'s e-mail: ");
            email = read.nextLine();

            System.out.println("Insert "+nome+"'s phone number: ");
            telefone = Integer.parseInt(read.nextLine());

            System.out.println("Insert "+nome+"'s home adress: ");
            endereco = read.nextLine();

            System.out.println("Insert "+nome+"'s course: ");
            curso = read.nextLine();

            System.out.println("Now, insert the number of absences during classes: ");
            numero_de_faltas = Integer.parseInt(read.nextLine());

            System.out.println("Insert the first grade: ");
            nota1 = Double.parseDouble(read.nextLine());

            System.out.println("Insert the second grade: ");
            nota2 = Double.parseDouble(read.nextLine());
            System.out.println("Insert the third grade: ");
            nota3 = Double.parseDouble(read.nextLine());

            Alunos myAluno = new Alunos(matricula,telefone,numero_de_faltas,media,nota1,nota2,nota3,nome,email,curso,endereco,vector);
            myAluno.lancamentoFaltas(numero_de_faltas);
            myAluno.lancamentoNotas(nota1, nota2,nota3);
            myAluno.printBonito(nome,matricula,telefone,email,endereco, curso,numero_de_faltas,vector);

        }catch (Exception NumberFormatException){
            System.out.println("Something went wrong while inputting the data. Try again.");
        }
    }
}