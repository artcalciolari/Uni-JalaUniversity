import java.io.*;
import java.util.*;

public class BookIndex {

    // Mapa cujo valor é uma lista de páginas (sem ordenar automaticamente).
    private final HashMap<String, List<Integer>> index;

    public BookIndex() {
        index = new HashMap<>();
    }

    // Exemplo de uso no main:
    public static void main(String[] args) {
        BookIndex bookIndex = new BookIndex();
        String fileName = "indexFile.txt"; // Nome do arquivo de índice

        try {
            // 1) Carrega do arquivo (se existir)
            bookIndex.loadFromFile(fileName);

            // 2) Exibe índice inicial
            bookIndex.displayIndex();

            // Pequeno menu de demonstração
            Scanner sc = new Scanner(System.in);
            boolean running = true;

            while (running) {
                System.out.println("\n=== Menu ===");
                System.out.println("1) Adicionar ou Atualizar termo/página");
                System.out.println("2) Remover termo");
                System.out.println("3) Atualizar termo (sinônimo)");
                System.out.println("4) Remover página de todos os termos");
                System.out.println("5) Buscar termos por prefixo");
                System.out.println("6) Exibir índice");
                System.out.println("7) Salvar e sair");
                System.out.print("Escolha: ");

                String choice = sc.nextLine().trim();

                switch (choice) {
                    case "1":
                        System.out.print("Termo a adicionar ou atualizar: ");
                        String termAdd = sc.nextLine();
                        System.out.print("Número(s) da página (ex: 10-20, 30): ");
                        String pagesInput = sc.nextLine();
                        String[] segments = pagesInput.split(",");
                        for (String segment : segments) {
                            segment = segment.trim();
                            if (segment.contains("-")) {
                                String[] range = segment.split("-");
                                if (range.length == 2) {
                                    try {
                                        int start = Integer.parseInt(range[0].trim());
                                        int end = Integer.parseInt(range[1].trim());
                                        for (int page = start; page <= end; page++) {
                                            bookIndex.addTerm(termAdd, page);
                                        }
                                    } catch (NumberFormatException e) {
                                        System.out.println("Formato de intervalo inválido: " + segment);
                                    }
                                }
                            } else {
                                try {
                                    int page = Integer.parseInt(segment);
                                    bookIndex.addTerm(termAdd, page);
                                } catch (NumberFormatException e) {
                                    System.out.println("Número de página inválido: " + segment);
                                }
                            }
                        }
                        System.out.println("Página(s) adicionada(s).");
                        break;
                    case "2":
                        System.out.print("Termo a remover: ");
                        String termRemove = sc.nextLine();
                        bookIndex.removeTerm(termRemove);
                        System.out.println("Termo removido (se existia).");
                        break;
                    case "3":
                        System.out.print("Termo atual: ");
                        String oldTerm = sc.nextLine();
                        System.out.print("Novo termo (sinônimo): ");
                        String newTerm = sc.nextLine();
                        bookIndex.updateTerm(oldTerm, newTerm);
                        System.out.println("Termo atualizado (se existia).");
                        break;
                    case "4":
                        System.out.print("Página a remover de todos os termos: ");
                        int pageRem = Integer.parseInt(sc.nextLine());
                        bookIndex.removePageFromAllTerms(pageRem);
                        System.out.println("Página removida (se existia).");
                        break;
                    case "5":
                        System.out.print("Prefixo para busca: ");
                        String prefix = sc.nextLine();
                        List<String> found = bookIndex.searchByPrefix(prefix);
                        System.out.println("Termos encontrados:");
                        for (String t : found) {
                            System.out.println("  " + t);
                        }
                        break;
                    case "6":
                        bookIndex.displayIndex();
                        break;
                    case "7":
                        bookIndex.saveToFile(fileName);
                        System.out.println("Dados salvos. Encerrando.");
                        running = false;
                        break;
                    default:
                        System.out.println("Opção inválida.");
                }
            }

            sc.close();

        } catch (IOException e) {
            System.err.println("Erro ao ler/gravar arquivo: " + e.getMessage());
        }
    }

    /**
     * Lê o arquivo de índice e popula o HashMap.
     * Formato de cada linha:
     * "Termo: 10-12, 20, 25-26"
     */
    public void loadFromFile(String fileName) throws IOException {
        File f = new File(fileName);
        if (!f.exists()) {
            System.out.println("Arquivo de índice não encontrado.");
            return;
        }

        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                parseAndAddLine(line);
            }
        }
    }

    /**
     * Faz o parse de uma linha, ex: "Arrays: 10-12, 20"
     * e insere/atualiza no HashMap.
     */
    private void parseAndAddLine(String line) {
        // Ex.: "Arrays: 10-12, 20"
        String[] parts = line.split(":");
        if (parts.length < 2) {
            return; // linha possivelmente inválida
        }
        String term = parts[0].trim();
        String pagesPart = parts[1].trim(); // "10-12, 20"

        // Divide por vírgula
        String[] segments = pagesPart.split(",");
        for (String segment : segments) {
            segment = segment.trim();
            // Se for intervalo (ex: "10-12") ou página única (ex: "30")
            if (segment.contains("-")) {
                String[] range = segment.split("-");
                if (range.length == 2) {
                    try {
                        int start = Integer.parseInt(range[0].trim());
                        int end = Integer.parseInt(range[1].trim());
                        for (int page = start; page <= end; page++) {
                            addTerm(term, page);
                        }
                    } catch (NumberFormatException e) {
                        // Se der erro, ignorar
                    }
                }
            } else {
                // página individual
                try {
                    int page = Integer.parseInt(segment);
                    addTerm(term, page);
                } catch (NumberFormatException e) {
                    // ignorar
                }
            }
        }
    }

    /**
     * Salva o índice (HashMap) de volta para o arquivo,
     * convertendo listas de páginas em intervalos.
     */
    public void saveToFile(String fileName) throws IOException {
        // Ordena os termos em ordem alfabética
        List<String> terms = new ArrayList<>(index.keySet());
        Collections.sort(terms);

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(fileName))) {
            for (String term : terms) {
                List<Integer> pages = index.get(term);

                // Converte lista de Integers para String no formato "10-12, 20, 25-27"
                String pagesString = convertPagesToString(pages);

                bw.write(term + ": " + pagesString);
                bw.newLine();
            }
        }
    }

    /**
     * Converte a lista de páginas em uma representação com intervalos,
     * ex.: [10, 11, 12, 20] -> "10-12, 20".
     */
    private String convertPagesToString(List<Integer> pagesList) {
        if (pagesList == null || pagesList.isEmpty()) return "";

        // Garante que a lista esteja ordenada antes de transformar em intervalos
        List<Integer> sorted = new ArrayList<>(pagesList);
        Collections.sort(sorted);

        StringBuilder sb = new StringBuilder();
        int start = -1;
        int prev = -1;
        boolean first = true;

        for (int page : sorted) {
            if (start < 0) {
                // Inicia um novo intervalo
                start = page;
                prev = page;
            } else if (page == prev + 1) {
                // Continua o intervalo
                prev = page;
            } else {
                // Fecha o intervalo anterior e inicia outro
                if (!first) {
                    sb.append(", ");
                }
                appendRange(sb, start, prev);
                first = false;

                start = page;
                prev = page;
            }
        }

        // Fecha o último intervalo
        if (start != -1) {
            if (!first) {
                sb.append(", ");
            }
            appendRange(sb, start, prev);
        }

        return sb.toString();
    }

    private void appendRange(StringBuilder sb, int start, int end) {
        if (start == end) {
            sb.append(start);
        } else {
            sb.append(start).append("-").append(end);
        }
    }

    /**
     * Adiciona um termo e uma página ao índice.
     * Se o termo não existir, cria. Senão, adiciona página na lista se não existir.
     */
    public void addTerm(String term, int page) {
        term = term.trim();
        // Se não existir a lista, cria
        index.putIfAbsent(term, new ArrayList<>());
        List<Integer> pagesList = index.get(term);

        // Se já existir a página, não adiciona para evitar duplicatas
        if (!pagesList.contains(page)) {
            pagesList.add(page);
        }
    }

    /**
     * Remove totalmente um termo do índice.
     */
    public void removeTerm(String term) {
        index.remove(term.trim());
    }

    /**
     * Atualiza o nome de um termo (por exemplo, trocar por um sinônimo).
     * Mantém as mesmas páginas, mas com a nova chave.
     */
    public void updateTerm(String oldTerm, String newTerm) {
        oldTerm = oldTerm.trim();
        newTerm = newTerm.trim();
        if (!index.containsKey(oldTerm)) {
            return;
        }
        List<Integer> oldPages = index.remove(oldTerm);

        // Se já existir o novo termo, somamos as páginas
        index.putIfAbsent(newTerm, new ArrayList<>());
        List<Integer> newPages = index.get(newTerm);

        // Adicionar todas, sem duplicar
        for (int p : oldPages) {
            if (!newPages.contains(p)) {
                newPages.add(p);
            }
        }
    }

    /**
     * Remove de TODOS os termos uma página que foi excluída (se estiver na lista).
     */
    public void removePageFromAllTerms(int page) {
        for (String term : index.keySet()) {
            index.get(term).removeIf(p -> p == page);
        }
    }

    /**
     * Retorna todos os termos que começam com um certo prefixo (case-sensitive).
     */
    public List<String> searchByPrefix(String prefix) {
        prefix = prefix.trim();
        List<String> result = new ArrayList<>();
        for (String term : index.keySet()) {
            if (term.startsWith(prefix)) {
                result.add(term);
            }
        }
        Collections.sort(result);
        return result;
    }

    /**
     * Exibe todos os termos e suas páginas (consolidados em intervalos) no console.
     */
    public void displayIndex() {
        List<String> terms = new ArrayList<>(index.keySet());
        Collections.sort(terms);

        System.out.println("==== Book Index ====");
        for (String term : terms) {
            List<Integer> pagesList = index.get(term);
            String pagesString = convertPagesToString(pagesList);
                System.out.printf("Termo: " + term + " | Página: " + pagesString + "\n");
        }
        System.out.println("====================");
    }
}
