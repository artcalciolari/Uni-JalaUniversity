import { Funcionario } from './Funcionario';

export class Professor extends Funcionario {
    private titulacao: string;

    constructor(nome: string, idade: number, cpf: string, titulacao: string) {
        super(nome, idade, cpf);
        this.titulacao = titulacao;
    }

    // Getter e Setter para titulacao
    public getTitulacao(): string {
        return this.titulacao;
    }

    public setTitulacao(titulacao: string): void {
        this.titulacao = titulacao;
    }

    // Sobrescrita do método exibirInformacoes
    public exibirInformacoes(): string {
        return `${super.exibirInformacoes()}\nTitulação: ${this.titulacao}\nCargo: Professor`;
    }
}
