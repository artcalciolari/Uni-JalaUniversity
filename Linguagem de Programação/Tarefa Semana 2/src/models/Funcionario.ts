export class Funcionario {
    protected nome: string;
    protected idade: number;
    protected cpf: string;

    constructor(nome: string, idade: number, cpf: string) {
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
    }

    // Getters
    public getNome(): string {
        return this.nome;
    }

    public getIdade(): number {
        return this.idade;
    }

    public getCpf(): string {
        return this.cpf;
    }

    // Setters
    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setIdade(idade: number): void {
        this.idade = idade;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    // Método para exibir informações
    public exibirInformacoes(): string {
        return `Nome: ${this.nome}\nIdade: ${this.idade}\nCPF: ${this.cpf}`;
    }
}
