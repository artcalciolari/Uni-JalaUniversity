package handlers;

import javax.swing.*;
import java.awt.*;

class ScrollPaneWithTextArea {
    protected JScrollPane createScrollPaneWithTextArea(String text) {
        JTextArea textArea = new JTextArea(text);
        textArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(textArea);
        scrollPane.setPreferredSize(new Dimension(400, 300));
        return scrollPane;
    }
}
