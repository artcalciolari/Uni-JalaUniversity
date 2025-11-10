import { Funcionario } from './Funcionario';

export class Administrativo extends Funcionario {
    private setor: string;

    constructor(nome: string, idade: number, cpf: string, setor: string) {
        super(nome, idade, cpf);
        this.setor = setor;
    }

    // Getter e Setter para setor
    public getSetor(): string {
        return this.setor;
    }

    public setSetor(setor: string): void {
        this.setor = setor;
    }

    // Sobrescrita do método exibirInformacoes
    public exibirInformacoes(): string {
        return `${super.exibirInformacoes()}\nSetor: ${this.setor}\nCargo: Administrativo`;
    }
}
