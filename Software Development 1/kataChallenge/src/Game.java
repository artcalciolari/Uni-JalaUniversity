import java.util.HashMap;


public class Game {

    public String winner(String[] deckSteve, String[] deckJosh) {
        HashMap<String, Integer> cardValues = new HashMap<>();
        cardValues.put("2",1);
        cardValues.put("3",2);
        cardValues.put("4",3);
        cardValues.put("5",4);
        cardValues.put("6",5);
        cardValues.put("7",6);
        cardValues.put("8",7);
        cardValues.put("9",8);
        cardValues.put("10",9);
        cardValues.put("J",10);
        cardValues.put("Q",11);
        cardValues.put("K",12);
        cardValues.put("A",13);

        int scoreSteve = 0, scoreJosh = 0;

        for(int i =0; i< deckSteve.length; i++) {
            String cardSteve = deckSteve[i];
            String cardJosh = deckJosh[i];

            int rankSteve = cardValues.get(cardSteve);
            int rankJosh = cardValues.get(cardJosh);

            switch (Integer.compare(rankSteve, rankJosh)) {
                case 1:
                    scoreSteve++;
                    break;
                case -1:
                    scoreJosh++;
                    break;
                default:
                    break;
            }

        }
        if (scoreSteve > scoreJosh) {
            return "Steve wins "+scoreSteve+" to "+scoreJosh;
        }
        else if(scoreJosh > scoreSteve) {
            return "Josh wins "+scoreJosh+ " to " +scoreSteve;
        }
        else {
            return "Tie";
        }
    }
}