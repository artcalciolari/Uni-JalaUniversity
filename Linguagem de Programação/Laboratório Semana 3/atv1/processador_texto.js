/**
 * PROCESSADOR DE TEXTO - ANÁLISE DE FREQUÊNCIA DE PALAVRAS
 * =========================================================
 * 
 * Este programa lê um arquivo de texto, processa seu conteúdo e identifica
 * as 5 palavras mais frequentes, salvando os resultados em um arquivo de saída.
 * 
 * INSTRUÇÕES CHAVE:
 * -----------------
 * 1. Leitura de arquivo com fs (File System)
 * 2. Normalização de texto (minúsculas, remoção de pontuação)
 * 3. Uso de Map para contagem de frequências
 * 4. Ordenação de array de objetos
 * 5. Escrita de resultados em arquivo de saída
 */

const fs = require('fs');

/**
 * Classe responsável por processar texto e analisar frequência de palavras.
 * 
 * ESTRUTURAS USADAS:
 * ------------------
 * - fs.readFileSync/writeFileSync: Leitura/escrita síncrona de arquivos
 * - RegExp: Expressões regulares para limpeza de texto
 * - Map: Estrutura de dados para contagem eficiente
 * - Array methods: filter, map, sort para processamento
 */
class ProcessadorTexto {
    /**
     * Inicializa o processador com o caminho do arquivo de entrada.
     * 
     * @param {string} arquivoEntrada - Caminho do arquivo a ser processado
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - constructor: Método especial para inicializar objetos da classe
     * - this: Referência ao próprio objeto instanciado
     */
    constructor(arquivoEntrada) {
        this.arquivoEntrada = arquivoEntrada;
        this.texto = '';
        this.palavras = [];
        this.frequencias = new Map();
    }

    /**
     * Lê o conteúdo do arquivo de texto.
     * 
     * INSTRUÇÕES CHAVE:
     * -----------------
     * - fs.readFileSync(): Leitura síncrona (bloqueia execução até terminar)
     * - 'utf-8': Encoding para suportar caracteres especiais
     * - try-catch: Tratamento de exceções/erros
     * - return boolean: Indica sucesso ou falha da operação
     */
    lerArquivo() {
        try {
            this.texto = fs.readFileSync(this.arquivoEntrada, 'utf-8');
            console.log(`✓ Arquivo '${this.arquivoEntrada}' lido com sucesso!`);
            return true;
        } catch (erro) {
            if (erro.code === 'ENOENT') {
                console.log(`✗ Erro: Arquivo '${this.arquivoEntrada}' não encontrado!`);
            } else {
                console.log(`✗ Erro ao ler arquivo: ${erro.message}`);
            }
            return false;
        }
    }

    /**
     * Processa o texto extraindo e normalizando as palavras.
     * 
     * INSTRUÇÕES CHAVE:
     * -----------------
     * - toLowerCase(): Converte para minúsculas (normalização)
     * - match(): Usa regex para extrair palavras
     * - /\b\w+\b/g: Padrão regex para capturar palavras
     *   * \b: Limite de palavra
     *   * \w+: Um ou mais caracteres alfanuméricos
     *   * g: Flag global (todas as ocorrências)
     * - || []: Operador OR para retornar array vazio se null
     */
    processarTexto() {
        // Converte para minúsculas para contagem case-insensitive
        const textoMinusculo = this.texto.toLowerCase();
        
        // Extrai apenas palavras (remove pontuação e espaços)
        // match() retorna null se não encontrar, por isso usamos || []
        this.palavras = textoMinusculo.match(/\b\w+\b/g) || [];
        
        console.log(`✓ ${this.palavras.length} palavras extraídas do texto.`);
    }

    /**
     * Conta a frequência de cada palavra no texto.
     * 
     * ESTRUTURAS USADAS:
     * ------------------
     * - Map: Estrutura chave-valor otimizada
     *   * get(key): Obtém valor associado à chave
     *   * set(key, value): Define valor para uma chave
     * - forEach(): Itera sobre array executando função para cada elemento
     * - Arrow function: Sintaxe compacta (palavra) => { ... }
     */
    contarFrequencias() {
        // Itera sobre cada palavra e conta frequências
        this.palavras.forEach(palavra => {
            // Se palavra já existe no Map, incrementa; senão, inicia com 1
            const frequenciaAtual = this.frequencias.get(palavra) || 0;
            this.frequencias.set(palavra, frequenciaAtual + 1);
        });
        
        console.log(`✓ Frequência calculada para ${this.frequencias.size} palavras únicas.`);
    }

    /**
     * Retorna as n palavras mais frequentes.
     * 
     * @param {number} n - Número de palavras a retornar (padrão: 5)
     * @returns {Array} Array de objetos {palavra, frequencia}
     * 
     * INSTRUÇÕES CHAVE:
     * -----------------
     * - Array.from(): Converte Map em array
     * - Destructuring: [palavra, freq] extrai elementos da tupla
     * - Object literal: { palavra, freq } cria objeto (shorthand)
     * - sort(): Ordena array in-place
     * - slice(): Cria novo array com subset de elementos
     */
    obterTopPalavras(n = 5) {
        // Converte Map em array de objetos e ordena por frequência
        const palavrasOrdenadas = Array.from(this.frequencias)
            .map(([palavra, freq]) => ({ palavra, frequencia: freq }))
            .sort((a, b) => b.frequencia - a.frequencia);
        
        // Retorna apenas os n primeiros elementos
        return palavrasOrdenadas.slice(0, n);
    }

    /**
     * Gera um relatório com os resultados e salva em arquivo.
     * 
     * @param {string} arquivoSaida - Nome do arquivo de saída
     * 
     * INSTRUÇÕES CHAVE:
     * -----------------
     * - Template literals: `texto ${variavel}` para interpolação
     * - Array.join('\n'): Junta elementos com quebra de linha
     * - padEnd/padStart: Métodos para padding e alinhamento
     * - fs.writeFileSync(): Escrita síncrona em arquivo
     */
    gerarRelatorio(arquivoSaida = 'resultado_frequencias.txt') {
        const top5 = this.obterTopPalavras(5);
        
        // Prepara o conteúdo do relatório
        const relatorio = [];
        relatorio.push('='.repeat(60));
        relatorio.push('ANÁLISE DE FREQUÊNCIA DE PALAVRAS');
        relatorio.push('='.repeat(60));
        relatorio.push(`\nArquivo analisado: ${this.arquivoEntrada}`);
        relatorio.push(`Total de palavras: ${this.palavras.length}`);
        relatorio.push(`Palavras únicas: ${this.frequencias.size}`);
        relatorio.push('\n' + '-'.repeat(60));
        relatorio.push('TOP 5 PALAVRAS MAIS FREQUENTES');
        relatorio.push('-'.repeat(60));
        relatorio.push(
            'Posição'.padEnd(10) + 
            'Palavra'.padEnd(20) + 
            'Frequência'.padStart(10)
        );
        relatorio.push('-'.repeat(60));
        
        // Adiciona cada palavra do top 5
        top5.forEach((item, index) => {
            const posicao = String(index + 1).padEnd(10);
            const palavra = item.palavra.padEnd(20);
            const freq = String(item.frequencia).padStart(10);
            relatorio.push(posicao + palavra + freq);
        });
        
        relatorio.push('='.repeat(60));
        
        // Junta todas as linhas com quebra de linha
        const conteudoRelatorio = relatorio.join('\n');
        
        // Salva em arquivo
        try {
            fs.writeFileSync(arquivoSaida, conteudoRelatorio, 'utf-8');
            console.log(`\n✓ Relatório salvo em '${arquivoSaida}'`);
        } catch (erro) {
            console.log(`\n✗ Erro ao salvar relatório: ${erro.message}`);
        }
        
        // Também imprime no console
        console.log('\n' + conteudoRelatorio);
        
        return conteudoRelatorio;
    }
}

/**
 * Função principal que coordena a execução do programa.
 * 
 * FLUXO DO PROGRAMA:
 * ------------------
 * 1. Criar instância do processador
 * 2. Ler arquivo de entrada
 * 3. Processar e normalizar texto
 * 4. Contar frequências
 * 5. Gerar e exibir relatório
 */
function main() {
    console.log('\n' + '='.repeat(60));
    console.log('PROCESSADOR DE TEXTO - ANÁLISE DE FREQUÊNCIA');
    console.log('='.repeat(60) + '\n');
    
    // Caminho do arquivo de entrada
    const arquivoEntrada = 'texto.txt';
    
    // Cria instância do processador
    const processador = new ProcessadorTexto(arquivoEntrada);
    
    // Executa o processamento
    if (processador.lerArquivo()) {
        processador.processarTexto();
        processador.contarFrequencias();
        processador.gerarRelatorio();
    } else {
        console.log('\n✗ Falha no processamento. Verifique o arquivo de entrada.');
    }
}

/**
 * PONTO DE ENTRADA DO PROGRAMA
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - Node.js executa o código do arquivo automaticamente
 * - Verifica se está sendo executado diretamente (não importado como módulo)
 * - require.main === module: Similar ao if __name__ == "__main__" do Python
 */
if (require.main === module) {
    main();
}

// Exporta a classe para uso como módulo (opcional)
module.exports = ProcessadorTexto;
