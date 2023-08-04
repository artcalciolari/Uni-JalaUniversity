import java.util.Scanner;

public class NotaAssignment {
    public static float notaAssignment() {
        Scanner read = new Scanner(System.in);
        float quiz1 = 0, quiz2 = 0;
        float assSemana1 = 0,assSemana2 = 0,assSemana3 = 0,assSemana4 = 0,assSemana5 = 0,assSemana6 = 0;

        System.out.println("Insira a nota de seus ASSIGNMENTS EM ORDEM + a nota de seus 2 Quizzes.\n[Comece do 1 ao 6]");


        System.out.println("1:");
        assSemana1 = read.nextInt();
        System.out.println("2:");
        assSemana2 = read.nextInt();
        System.out.println("3:");
        assSemana3 = read.nextInt();
        System.out.println("4:");
        assSemana4 = read.nextInt();
        System.out.println("5:");
        assSemana5 = read.nextInt();
        System.out.println("6:");
        assSemana6 = read.nextInt();
        System.out.println("Quiz 1:");
        quiz1 = read.nextInt();
        System.out.println("Quiz 2:");
        quiz2 = read.nextInt();


        float totalAssignment = (float) 100*(((quiz1+assSemana1)/35)+((quiz2+assSemana2)/25)+(assSemana3/20)+(assSemana4/20)+(assSemana5/20)+(assSemana6/20))/6;
        return totalAssignment;
    }
}
