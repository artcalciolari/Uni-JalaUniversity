import java.util.ArrayList;
import java.util.List;

public class Orquestra {
    List<Instrumentos> listaInstrumentos = new ArrayList<>();
    void addToList(Instrumentos instrumentos) {
        listaInstrumentos.add(instrumentos);
    }
    void playInstruments() {
        System.out.println("Orquestra: "+listaInstrumentos);
    }
    void playIndexInstruments(int i) {
        System.out.println("Instrumento: "+ listaInstrumentos.get(i));
    }
}
