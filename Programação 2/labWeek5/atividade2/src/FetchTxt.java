import Utils.FileChooser;
import Utils.MassCalculator;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Stack;

public class FetchTxt {
    FileChooser fileChooser = new FileChooser();

    Stack<Character> characterStack = new Stack<>();
    String fileChosen = fileChooser.txtChooser();

    public void fetchThenAdd() {

        try (BufferedReader br = new BufferedReader(new FileReader(fileChosen))) {
            String digito;
            while ((digito = br.readLine()) != null) {
                for (char c : digito.toCharArray()) {
                    characterStack.add(c);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        MassCalculator mc = new MassCalculator();
        mc.calculateMass(characterStack);
    }
}
