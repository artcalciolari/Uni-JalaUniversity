/**
 * SISTEMA DE GERENCIAMENTO DE ESTUDANTES - VERSÃO FUNCIONAL
 * ==========================================================
 * 
 * Este programa implementa um sistema usando paradigma funcional para gerenciar
 * informações de estudantes, calcular médias e verificar aprovação.
 * 
 * CONCEITOS FUNCIONAIS UTILIZADOS:
 * ---------------------------------
 * 1. Funções puras: Não modificam estado externo
 * 2. Imutabilidade: Dados não são alterados, novos dados são criados
 * 3. Higher-order functions: map, filter, reduce
 * 4. Composição de funções: Combinar funções simples
 * 5. Arrow functions: Sintaxe concisa para funções
 */


// DADOS: Representação de estudantes como objetos (estrutura de dados)
// INSTRUÇÃO CHAVE: Objetos são imutáveis quando usados funcionalmente
const ESTUDANTES = [
    { nome: 'Ana Silva', notas: [85, 92, 78, 88, 90] },
    { nome: 'Carlos Santos', notas: [55, 62, 48, 58, 52] },
    { nome: 'Maria Oliveira', notas: [95, 98, 100, 94, 97] },
    { nome: 'João Ferreira', notas: [70, 75, 68, 72, 71] },
    { nome: 'Beatriz Costa', notas: [45, 50, 42, 48, 51] },
    { nome: 'Pedro Alves', notas: [80, 85, 82, 88, 84] }
];

// Constante
const NOTA_MINIMA_APROVACAO = 60.0;


// ============================================================================
// FUNÇÕES PURAS - Não modificam estado, apenas transformam dados
// ============================================================================

/**
 * Calcula a média de um array de notas.
 * 
 * @param {Array<number>} notas - Array de notas
 * @returns {number} Média aritmética das notas
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - Função pura: mesmo input sempre produz mesmo output
 * - Não tem efeitos colaterais (não modifica variáveis externas)
 * - reduce(): Agrega array em valor único
 */
const calcularMedia = (notas) => {
    if (!notas || notas.length === 0) {
        return 0.0;
    }

    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    const media = soma / notas.length;
    return parseFloat(media.toFixed(2));
};


/**
 * Verifica se média é suficiente para aprovação.
 * 
 * @param {number} media - Média do estudante
 * @returns {boolean} true se aprovado, false caso contrário
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - Função pura que retorna booleano
 * - Predicado: função que retorna true ou false
 */
const estaAprovado = (media) => media >= NOTA_MINIMA_APROVACAO;


/**
 * Retorna string de status baseado na média.
 * 
 * @param {number} media - Média do estudante
 * @returns {string} Status de aprovação
 */
const obterStatus = (media) => estaAprovado(media) ? 'APROVADO' : 'REPROVADO';


/**
 * Adiciona campo de média ao objeto do estudante.
 * 
 * @param {Object} estudante - Objeto com dados do estudante
 * @returns {Object} Novo objeto com campo 'media' adicionado
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - Imutabilidade: não modifica o objeto original
 * - Spread operator (...): copia todas as propriedades
 * - {...obj, novoCampo: valor}: cria novo objeto com campo adicional
 */
const adicionarMedia = (estudante) => ({
    ...estudante,
    media: calcularMedia(estudante.notas)
});


/**
 * Adiciona campo de status ao objeto do estudante.
 * 
 * @param {Object} estudante - Objeto com dados do estudante (deve ter 'media')
 * @returns {Object} Novo objeto com campo 'status' adicionado
 */
const adicionarStatus = (estudante) => ({
    ...estudante,
    status: obterStatus(estudante.media)
});


// ============================================================================
// HIGHER-ORDER FUNCTIONS - Funções que operam sobre outras funções
// ============================================================================

/**
 * Processa array de estudantes adicionando médias e status.
 * 
 * @param {Array<Object>} estudantes - Array de objetos de estudantes
 * @returns {Array<Object>} Novo array com dados processados
 * 
 * INSTRUÇÃO CHAVE - MAP:
 * ----------------------
 * - map(função): Aplica função a cada elemento
 * - Retorna novo array transformado
 * - Transformação de dados sem loops explícitos
 * - Composição: aplica adicionarStatus(adicionarMedia(x))
 */
const processarEstudantes = (estudantes) => {
    // Primeira transformação: adiciona média
    const estudantesComMedia = estudantes.map(adicionarMedia);

    // Segunda transformação: adiciona status
    const estudantesProcessados = estudantesComMedia.map(adicionarStatus);

    return estudantesProcessados;
};


/**
 * Filtra estudantes aprovados.
 * 
 * @param {Array<Object>} estudantes - Array de estudantes processados
 * @returns {Array<Object>} Array contendo apenas aprovados
 * 
 * INSTRUÇÃO CHAVE - FILTER:
 * --------------------------
 * - filter(predicado): Filtra elementos que satisfazem condição
 * - predicado: função que retorna true/false
 * - Arrow function: est => expressão
 * - Cria novo array sem modificar original
 */
const filtrarAprovados = (estudantes) => 
    estudantes.filter(est => estaAprovado(est.media));


/**
 * Filtra estudantes reprovados.
 * 
 * @param {Array<Object>} estudantes
 * @returns {Array<Object>}
 */
const filtrarReprovados = (estudantes) =>
    estudantes.filter(est => !estaAprovado(est.media));


/**
 * Calcula média geral da turma.
 * 
 * @param {Array<Object>} estudantes - Array de estudantes processados
 * @returns {number} Média geral da turma
 * 
 * INSTRUÇÃO CHAVE - REDUCE:
 * --------------------------
 * - reduce(função, inicial): Reduz array a valor único
 * - função recebe (acumulador, elementoAtual)
 * - acumulador mantém resultado parcial
 * - Padrão fold/reduce comum em programação funcional
 */
const calcularMediaTurma = (estudantes) => {
    if (estudantes.length === 0) {
        return 0.0;
    }

    // Reduce soma todas as médias
    const somaMedias = estudantes.reduce(
        (acumulador, estudante) => acumulador + estudante.media,
        0  // Valor inicial do acumulador
    );

    const media = somaMedias / estudantes.length;
    return parseFloat(media.toFixed(2));
};


/**
 * Encontra a maior média entre os estudantes.
 * 
 * INSTRUÇÃO CHAVE - REDUCE:
 * --------------------------
 * - Uso alternativo de reduce para encontrar máximo
 * - Math.max() é mais idiomático, mas reduce demonstra flexibilidade
 * 
 * @param {Array<Object>} estudantes
 * @returns {number}
 */
const obterMelhorMedia = (estudantes) => {
    if (estudantes.length === 0) {
        return 0.0;
    }

    return estudantes.reduce(
        (maxMedia, estudante) => Math.max(maxMedia, estudante.media),
        0
    );
};


/**
 * Encontra a menor média entre os estudantes.
 * 
 * @param {Array<Object>} estudantes
 * @returns {number}
 */
const obterPiorMedia = (estudantes) => {
    if (estudantes.length === 0) {
        return 0.0;
    }

    return estudantes.reduce(
        (minMedia, estudante) => Math.min(minMedia, estudante.media),
        100  // Valor inicial alto
    );
};


// ============================================================================
// FUNÇÕES DE APRESENTAÇÃO - Pure functions para formatação
// ============================================================================

/**
 * Formata informações de um estudante como string.
 * 
 * @param {Object} estudante
 * @returns {string}
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - Template literals: `texto ${variavel}` para interpolação
 * - join(): Concatena elementos com separador
 */
const formatarEstudante = (estudante) => {
    const notasStr = estudante.notas.join(', ');
    return `${estudante.nome} - ` +
           `Notas: [${notasStr}] - ` +
           `Média: ${estudante.media.toFixed(2)} - ` +
           `${estudante.status}`;
};


/**
 * Exibe array de estudantes formatado.
 * 
 * @param {Array<Object>} estudantes
 * @param {string} titulo
 * 
 * INSTRUÇÃO CHAVE - MAP & FOREACH:
 * ---------------------------------
 * - map(): Transforma cada estudante em string formatada
 * - forEach(): Itera para exibir (efeito colateral permitido)
 * - Separação de transformação (map) e efeito (forEach)
 */
const exibirEstudantes = (estudantes, titulo) => {
    console.log(`\n${titulo}`);

    // Map para formatar, forEach para exibir
    estudantes
        .map(formatarEstudante)
        .forEach(linha => console.log(`   • ${linha}`));
};


/**
 * Exibe estatísticas gerais da turma.
 * 
 * @param {Array<Object>} estudantes
 * @param {Array<Object>} aprovados
 * @param {Array<Object>} reprovados
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - Composição de funções: chama múltiplas funções puras
 * - Todas as estatísticas são calculadas sem modificar dados originais
 */
const exibirEstatisticas = (estudantes, aprovados, reprovados) => {
    const taxaAprovacao = (aprovados.length / estudantes.length * 100).toFixed(1);

    console.log('\n📊 Estatísticas Gerais:');
    console.log(`   Total de estudantes: ${estudantes.length}`);
    console.log(`   Média da turma: ${calcularMediaTurma(estudantes).toFixed(2)}`);
    console.log(`   Melhor média: ${obterMelhorMedia(estudantes).toFixed(2)}`);
    console.log(`   Pior média: ${obterPiorMedia(estudantes).toFixed(2)}`);
    console.log(`   Aprovados: ${aprovados.length}`);
    console.log(`   Reprovados: ${reprovados.length}`);
    console.log(`   Taxa de aprovação: ${taxaAprovacao}%`);
};


// ============================================================================
// PIPELINE FUNCIONAL - Composição de transformações
// ============================================================================

/**
 * Pipeline funcional completo de análise.
 * 
 * CONCEITO DE PIPELINE:
 * ---------------------
 * 1. Processar (map): adiciona média e status
 * 2. Filtrar (filter): separa aprovados e reprovados
 * 3. Agregar (reduce): calcula estatísticas
 * 4. Apresentar: exibe resultados
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - Composição funcional: resultado de uma função entra na próxima
 * - Dados fluem pela pipeline sem modificação
 * - Cada etapa cria novos dados (imutabilidade)
 * 
 * @param {Array<Object>} estudantesRaw
 * @returns {Object} Objeto com dados processados
 */
const pipelineAnaliseEstudantes = (estudantesRaw) => {
    // Etapa 1: Processar dados (MAP)
    const estudantesProcessados = processarEstudantes(estudantesRaw);

    // Etapa 2: Filtrar dados (FILTER)
    const aprovados = filtrarAprovados(estudantesProcessados);
    const reprovados = filtrarReprovados(estudantesProcessados);

    // Etapa 3: Retornar resultados organizados
    return {
        processados: estudantesProcessados,
        aprovados,
        reprovados
    };
};


/**
 * Função principal que coordena execução funcional.
 * 
 * FLUXO FUNCIONAL:
 * ----------------
 * 1. Dados imutáveis (constante ESTUDANTES)
 * 2. Pipeline de transformações
 * 3. Apresentação de resultados
 * 4. Dados originais nunca modificados
 */
function main() {
    console.log('\n' + '='.repeat(70));
    console.log('SISTEMA DE GERENCIAMENTO DE ESTUDANTES - VERSÃO FUNCIONAL');
    console.log('='.repeat(70));

    // Executa pipeline funcional
    const resultado = pipelineAnaliseEstudantes(ESTUDANTES);
    const { processados, aprovados, reprovados } = resultado;

    // Exibe relatório
    console.log('\n' + '='.repeat(70));
    console.log('RELATÓRIO COMPLETO DA TURMA');
    console.log('='.repeat(70));

    // Estatísticas
    exibirEstatisticas(processados, aprovados, reprovados);

    // Listas detalhadas
    if (aprovados.length > 0) {
        exibirEstudantes(aprovados, '\n✅ ESTUDANTES APROVADOS:');
    }

    if (reprovados.length > 0) {
        exibirEstudantes(reprovados, '\n❌ ESTUDANTES REPROVADOS:');
    }

    // Todos os estudantes
    exibirEstudantes(processados, '\n📋 TODOS OS ESTUDANTES:');

    console.log('\n' + '='.repeat(70));
}


/**
 * PONTO DE ENTRADA DO PROGRAMA
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - Verifica se está sendo executado diretamente (não importado como módulo)
 * - require.main === module: Similar ao if __name__ == "__main__" do Python
 */
if (require.main === module) {
    main();
}

// Exporta funções para uso como módulo (opcional)
module.exports = {
    calcularMedia,
    estaAprovado,
    processarEstudantes,
    filtrarAprovados,
    filtrarReprovados,
    calcularMediaTurma,
    pipelineAnaliseEstudantes
};
