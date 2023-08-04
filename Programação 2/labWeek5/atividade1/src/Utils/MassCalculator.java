package Utils;

import javax.swing.*;
import java.text.DecimalFormat;
import java.util.List;

public class MassCalculator {
    ProteinValues proteinValues = new ProteinValues();

    double sum = 0;

    public void calculateMass(List<Character> characterList) {

        for (char c : characterList) {
            sum += proteinValues.proteinHash.get(c);
        }

        DecimalFormat df = new DecimalFormat("#,###.##");
        String formattedSum = df.format(sum);

        JOptionPane.showMessageDialog(null, "The total mass of the protein present on the file was: " + formattedSum);
    }
}