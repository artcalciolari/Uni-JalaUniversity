package Utils;

import javax.swing.*;
import java.text.DecimalFormat;
import java.util.Stack;

public class MassCalculator {
    ProteinValues proteinValues = new ProteinValues();

    double sum = 0;

    public void calculateMass(Stack<Character> characterQueue) {

        while (!characterQueue.isEmpty()) {
            char c = characterQueue.pop();
            sum += proteinValues.proteinHash.get(c);
        }

        DecimalFormat df = new DecimalFormat("#,###.##");
        String formattedSum = df.format(sum);

        JOptionPane.showMessageDialog(null,"The total mass of the protein present on the file was: "+formattedSum);
    }
}