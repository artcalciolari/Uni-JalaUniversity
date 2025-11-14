/**
 * SISTEMA DE GERENCIAMENTO DE ESTUDANTES - VERSÃO OOP
 * ====================================================
 * 
 * Este programa implementa um sistema orientado a objetos para gerenciar
 * informações de estudantes, calcular médias e verificar aprovação.
 * 
 * CONCEITOS OOP UTILIZADOS:
 * --------------------------
 * 1. Encapsulamento: Dados e métodos agrupados na classe
 * 2. Métodos de instância: Operam sobre dados do objeto
 * 3. Propriedades: Armazenam estado do objeto
 * 4. Abstração: Interface simples esconde complexidade interna
 */


/**
 * Classe que representa um estudante com suas notas e operações relacionadas.
 * 
 * ESTRUTURA DA CLASSE:
 * --------------------
 * - Atributos: nome, notas
 * - Métodos: calcularMedia(), estaAprovado(), exibirInformacoes()
 * 
 * INSTRUÇÃO CHAVE:
 * ----------------
 * - constructor: Método especial chamado ao criar objeto
 * - this: Referência ao próprio objeto (similar ao 'self' do Python)
 */
class Estudante {
    // Propriedade estática (compartilhada por todas as instâncias)
    static NOTA_MINIMA_APROVACAO = 60.0;

    /**
     * Inicializa um novo estudante.
     * 
     * @param {string} nome - Nome do estudante
     * @param {Array<number>} notas - Lista de notas do estudante
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - this.propriedade: Define propriedades de instância
     * - Validação de dados no construtor garante integridade
     * - Array.isArray(): Verifica se é um array
     */
    constructor(nome, notas) {
        this.nome = nome;
        this.notas = Array.isArray(notas) ? notas : [];

        // Validação de dados
        if (this.notas.length === 0) {
            console.log(`⚠ Aviso: Estudante '${nome}' criado sem notas!`);
        }
    }

    /**
     * Calcula a média aritmética das notas do estudante.
     * 
     * @returns {number} Média das notas (0.0 se não houver notas)
     * 
     * INSTRUÇÕES CHAVE:
     * -----------------
     * - reduce(): Método funcional que reduz array a valor único
     * - (acc, nota) => acc + nota: Arrow function para somar
     * - toFixed(2): Formata número com 2 casas decimais
     * - parseFloat(): Converte string de volta para número
     */
    calcularMedia() {
        if (this.notas.length === 0) {
            return 0.0;
        }

        // Soma todas as notas usando reduce
        const soma = this.notas.reduce((acc, nota) => acc + nota, 0);
        const media = soma / this.notas.length;

        // Arredonda para 2 casas decimais
        return parseFloat(media.toFixed(2));
    }

    /**
     * Verifica se o estudante foi aprovado baseado na média.
     * 
     * @returns {boolean} true se aprovado (média >= 60), false caso contrário
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - Método chama outro método (calcularMedia)
     * - Acesso a propriedade estática: Estudante.NOTA_MINIMA_APROVACAO
     * - Retorno booleano para lógica clara
     */
    estaAprovado() {
        const media = this.calcularMedia();
        return media >= Estudante.NOTA_MINIMA_APROVACAO;
    }

    /**
     * Retorna o status de aprovação como string.
     * 
     * @returns {string} "APROVADO" ou "REPROVADO"
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - Operador ternário: condição ? valor_se_true : valor_se_false
     */
    obterStatus() {
        return this.estaAprovado() ? 'APROVADO' : 'REPROVADO';
    }

    /**
     * Exibe informações formatadas do estudante no console.
     * 
     * INSTRUÇÕES CHAVE:
     * -----------------
     * - Template literals: `texto ${variavel}` para interpolação
     * - repeat(): Repete string n vezes
     * - join(): Concatena elementos com separador
     */
    exibirInformacoes() {
        console.log(`\n${'─'.repeat(50)}`);
        console.log(`Nome: ${this.nome}`);
        console.log(`Notas: ${this.notas.join(', ')}`);
        console.log(`Média: ${this.calcularMedia().toFixed(2)}`);
        console.log(`Status: ${this.obterStatus()}`);
        console.log(`${'─'.repeat(50)}`);
    }

    /**
     * Representação em string do objeto (para console.log).
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - toString(): Método para representação legível
     * - Chamado automaticamente por console.log() e String()
     */
    toString() {
        return `${this.nome} - Média: ${this.calcularMedia().toFixed(2)} - ${this.obterStatus()}`;
    }
}


/**
 * Classe para gerenciar um conjunto de estudantes.
 * 
 * PADRÃO DE DESIGN:
 * -----------------
 * - Container/Manager pattern: Gerencia coleção de objetos
 * - Fornece operações agregadas sobre a coleção
 */
class GerenciadorEstudantes {
    /**
     * Inicializa o gerenciador com array vazio de estudantes.
     */
    constructor() {
        this.estudantes = [];
    }

    /**
     * Adiciona um estudante à lista.
     * 
     * @param {Estudante} estudante - Objeto estudante a adicionar
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - instanceof: Verifica tipo do objeto
     * - Type checking para garantir consistência
     */
    adicionarEstudante(estudante) {
        if (estudante instanceof Estudante) {
            this.estudantes.push(estudante);
        } else {
            console.log('⚠ Erro: Objeto fornecido não é um Estudante!');
        }
    }

    /**
     * Retorna array de estudantes aprovados.
     * 
     * @returns {Array<Estudante>} Array de estudantes aprovados
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - filter(): Método funcional que filtra array
     * - Arrow function: est => est.estaAprovado()
     * - Predicado: função que retorna boolean
     */
    obterAprovados() {
        return this.estudantes.filter(est => est.estaAprovado());
    }

    /**
     * Retorna array de estudantes reprovados.
     * 
     * @returns {Array<Estudante>}
     */
    obterReprovados() {
        return this.estudantes.filter(est => !est.estaAprovado());
    }

    /**
     * Calcula a média geral da turma.
     * 
     * @returns {number} Média geral da turma
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - map(): Transforma cada elemento (estudante -> média)
     * - reduce(): Agrega valores (soma todas as médias)
     * - Encadeamento de métodos (method chaining)
     */
    calcularMediaTurma() {
        if (this.estudantes.length === 0) {
            return 0.0;
        }

        // Extrai todas as médias e soma
        const somaMedias = this.estudantes
            .map(est => est.calcularMedia())
            .reduce((acc, media) => acc + media, 0);

        const mediaTurma = somaMedias / this.estudantes.length;
        return parseFloat(mediaTurma.toFixed(2));
    }

    /**
     * Exibe relatório completo da turma.
     * 
     * INSTRUÇÃO CHAVE:
     * ----------------
     * - Formatação complexa com múltiplas chamadas a métodos
     * - Separação de aprovados e reprovados
     * - forEach(): Itera sobre array executando função
     */
    exibirRelatorioCompleto() {
        console.log('\n' + '='.repeat(60));
        console.log('RELATÓRIO COMPLETO DA TURMA');
        console.log('='.repeat(60));

        console.log('\n📊 Estatísticas Gerais:');
        console.log(`   Total de estudantes: ${this.estudantes.length}`);
        console.log(`   Média da turma: ${this.calcularMediaTurma().toFixed(2)}`);

        const aprovados = this.obterAprovados();
        const reprovados = this.obterReprovados();

        console.log(`   Aprovados: ${aprovados.length}`);
        console.log(`   Reprovados: ${reprovados.length}`);

        if (aprovados.length > 0) {
            console.log('\n✅ ESTUDANTES APROVADOS:');
            aprovados.forEach(est => console.log(`   • ${est}`));
        }

        if (reprovados.length > 0) {
            console.log('\n❌ ESTUDANTES REPROVADOS:');
            reprovados.forEach(est => console.log(`   • ${est}`));
        }

        console.log('\n' + '='.repeat(60));
    }
}


/**
 * Função principal que demonstra o uso do sistema OOP.
 * 
 * FLUXO DO PROGRAMA:
 * ------------------
 * 1. Criar instâncias de Estudante
 * 2. Adicionar ao gerenciador
 * 3. Exibir informações individuais
 * 4. Exibir relatório consolidado
 */
function main() {
    console.log('\n' + '='.repeat(60));
    console.log('SISTEMA DE GERENCIAMENTO DE ESTUDANTES - VERSÃO OOP');
    console.log('='.repeat(60));

    // Criar gerenciador
    const gerenciador = new GerenciadorEstudantes();

    // Criar instâncias de estudantes
    // INSTRUÇÃO CHAVE: Instanciação de objetos com new Classe()
    const estudante1 = new Estudante('Ana Silva', [85, 92, 78, 88, 90]);
    const estudante2 = new Estudante('Carlos Santos', [55, 62, 48, 58, 52]);
    const estudante3 = new Estudante('Maria Oliveira', [95, 98, 100, 94, 97]);
    const estudante4 = new Estudante('João Ferreira', [70, 75, 68, 72, 71]);
    const estudante5 = new Estudante('Beatriz Costa', [45, 50, 42, 48, 51]);
    const estudante6 = new Estudante('Pedro Alves', [80, 85, 82, 88, 84]);

    // Adicionar estudantes ao gerenciador
    console.log('\n📝 Adicionando estudantes ao sistema...');
    const estudantes = [
        estudante1, estudante2, estudante3,
        estudante4, estudante5, estudante6
    ];

    estudantes.forEach(est => gerenciador.adicionarEstudante(est));

    console.log(`✓ ${estudantes.length} estudantes adicionados com sucesso!`);

    // Exibir informações individuais
    console.log('\n' + '='.repeat(60));
    console.log('INFORMAÇÕES INDIVIDUAIS DOS ESTUDANTES');
    console.log('='.repeat(60));

    gerenciador.estudantes.forEach(est => est.exibirInformacoes());

    // Exibir relatório consolidado
    gerenciador.exibirRelatorioCompleto();
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

// Exporta as classes para uso como módulo (opcional)
module.exports = { Estudante, GerenciadorEstudantes };
