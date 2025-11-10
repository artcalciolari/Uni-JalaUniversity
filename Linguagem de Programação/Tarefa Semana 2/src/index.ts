import { Funcionario } from './models/Funcionario';
import { Professor } from './models/Professor';
import { Administrativo } from './models/Administrativo';

/**
 * Arquivo principal para demonstração das classes
 */

// Criando instâncias de cada tipo de funcionário
console.log('=== SISTEMA DE GERENCIAMENTO DE FUNCIONÁRIOS ===\n');

// Criando um funcionário base
const funcionario1 = new Funcionario('João Silva', 35, '123.456.789-00');
console.log('--- Funcionário ---');
console.log(funcionario1.exibirInformacoes());
console.log();

// Criando um professor
const professor1 = new Professor(
    'Maria Santos',
    42,
    '987.654.321-00',
    'Doutorado em Ciência da Computação'
);
console.log('--- Professor ---');
console.log(professor1.exibirInformacoes());
console.log();

// Criando outro professor
const professor2 = new Professor(
    'Carlos Oliveira',
    38,
    '456.789.123-00',
    'Mestrado em Engenharia de Software'
);
console.log('--- Professor ---');
console.log(professor2.exibirInformacoes());
console.log();

// Criando um administrativo
const administrativo1 = new Administrativo(
    'Ana Paula',
    29,
    '321.654.987-00',
    'Recursos Humanos'
);
console.log('--- Administrativo ---');
console.log(administrativo1.exibirInformacoes());
console.log();

// Criando outro administrativo
const administrativo2 = new Administrativo(
    'Pedro Costa',
    45,
    '789.123.456-00',
    'Financeiro'
);
console.log('--- Administrativo ---');
console.log(administrativo2.exibirInformacoes());
console.log();

// Demonstrando o uso de setters
console.log('=== ATUALIZANDO INFORMAÇÕES ===\n');
professor1.setTitulacao('Pós-Doutorado em IA');
console.log('--- Professor Atualizado ---');
console.log(professor1.exibirInformacoes());
console.log();

administrativo1.setSetor('Tecnologia da Informação');
console.log('--- Administrativo Atualizado ---');
console.log(administrativo1.exibirInformacoes());
