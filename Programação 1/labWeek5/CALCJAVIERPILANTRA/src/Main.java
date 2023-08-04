public class Main {
    public static void main(String[] args) {

        System.out.println("Bem-Vindo(a).\nVocê precisa ter em mãos as notas de cada assignment e discussão desta matéria.");
        float notaAssignment = NotaAssignment.notaAssignment();
        float notaDiscussion = NotaDiscussion.notaDiscussion();
        float notaExam = NotaExam.notaExame();

        float NOTAFINALMEDIA = (float) ((0.1*notaDiscussion)+(0.5*notaAssignment)+(0.4*notaExam));

        System.out.println("A sua média de nota nos assignments foi: "+notaAssignment);
        System.out.println("A sua média nas discussões foi: "+notaDiscussion);
        System.out.println("A sua nota no exame foi: "+notaExam);
        System.out.println("A sua nota final foi: "+NOTAFINALMEDIA);

        if(NOTAFINALMEDIA >= 70) {
            System.out.println("Você passou! parabéns!");
        }else if(NOTAFINALMEDIA < 60) {
            System.out.println("Sinto muito, você reprovou neste curso.");
        }else {
            System.out.println("Você não passou nem reprovou. Envie o assignment 7.5 imediatamente!");
        }
    }
}