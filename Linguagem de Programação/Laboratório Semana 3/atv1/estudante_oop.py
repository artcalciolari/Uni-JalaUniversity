"""
SISTEMA DE GERENCIAMENTO DE ESTUDANTES - VERSÃO OOP
====================================================

Este programa implementa um sistema orientado a objetos para gerenciar
informações de estudantes, calcular médias e verificar aprovação.

CONCEITOS OOP UTILIZADOS:
--------------------------
1. Encapsulamento: Dados e métodos agrupados na classe
2. Métodos de instância: Operam sobre dados do objeto
3. Propriedades: Armazenam estado do objeto
4. Abstração: Interface simples esconde complexidade interna
"""


class Estudante:
    """
    Classe que representa um estudante com suas notas e operações relacionadas.
    
    ESTRUTURA DA CLASSE:
    --------------------
    - Atributos: nome, notas
    - Métodos: calcular_media(), esta_aprovado(), exibir_informacoes()
    
    INSTRUÇÃO CHAVE:
    ----------------
    - __init__: Método construtor chamado ao criar objeto
    - self: Referência ao próprio objeto (equivalente ao 'this' em outras linguagens)
    """
    
    # Constante de classe (compartilhada por todas as instâncias)
    NOTA_MINIMA_APROVACAO = 60.0
    
    def __init__(self, nome, notas):
        """
        Inicializa um novo estudante.
        
        Args:
            nome (str): Nome do estudante
            notas (list): Lista de notas do estudante
        
        INSTRUÇÃO CHAVE:
        ----------------
        - self.atributo: Define atributos de instância (específicos de cada objeto)
        - Validação de dados no construtor garante integridade
        """
        self.nome = nome
        self.notas = notas if notas else []
        
        # Validação de dados
        if not self.notas:
            print(f"⚠ Aviso: Estudante '{nome}' criado sem notas!")
    
    def calcular_media(self):
        """
        Calcula a média aritmética das notas do estudante.
        
        Returns:
            float: Média das notas (0.0 se não houver notas)
        
        INSTRUÇÕES CHAVE:
        -----------------
        - sum(): Função built-in que soma elementos de um iterável
        - len(): Retorna quantidade de elementos
        - round(): Arredonda número para precisão especificada
        - Tratamento de divisão por zero
        """
        if not self.notas:
            return 0.0
        
        # Calcula média: soma das notas / quantidade de notas
        media = sum(self.notas) / len(self.notas)
        return round(media, 2)  # Arredonda para 2 casas decimais
    
    def esta_aprovado(self):
        """
        Verifica se o estudante foi aprovado baseado na média.
        
        Returns:
            bool: True se aprovado (média >= 60), False caso contrário
        
        INSTRUÇÃO CHAVE:
        ----------------
        - Método chama outro método (calcular_media)
        - Comparação com constante de classe
        - Retorno booleano para lógica clara
        """
        media = self.calcular_media()
        return media >= self.NOTA_MINIMA_APROVACAO
    
    def obter_status(self):
        """
        Retorna o status de aprovação como string.
        
        Returns:
            str: "APROVADO" ou "REPROVADO"
        
        INSTRUÇÃO CHAVE:
        ----------------
        - Operador ternário: valor_se_true if condição else valor_se_false
        """
        return "APROVADO" if self.esta_aprovado() else "REPROVADO"
    
    def exibir_informacoes(self):
        """
        Exibe informações formatadas do estudante no console.
        
        INSTRUÇÕES CHAVE:
        -----------------
        - f-strings: Formatação moderna de strings
        - join(): Concatena elementos com separador
        - Formatação numérica com :.2f (2 casas decimais)
        """
        print(f"\n{'─' * 50}")
        print(f"Nome: {self.nome}")
        print(f"Notas: {', '.join(map(str, self.notas))}")
        print(f"Média: {self.calcular_media():.2f}")
        print(f"Status: {self.obter_status()}")
        print(f"{'─' * 50}")
    
    def __str__(self):
        """
        Representação em string do objeto (para print).
        
        INSTRUÇÃO CHAVE:
        ----------------
        - __str__: Método mágico para representação legível
        - Chamado automaticamente por print() e str()
        """
        return f"{self.nome} - Média: {self.calcular_media():.2f} - {self.obter_status()}"
    
    def __repr__(self):
        """
        Representação técnica do objeto (para debug).
        
        INSTRUÇÃO CHAVE:
        ----------------
        - __repr__: Método mágico para representação não-ambígua
        - Útil para debugging e logging
        """
        return f"Estudante(nome='{self.nome}', notas={self.notas})"


class GerenciadorEstudantes:
    """
    Classe para gerenciar um conjunto de estudantes.
    
    PADRÃO DE DESIGN:
    -----------------
    - Container/Manager pattern: Gerencia coleção de objetos
    - Fornece operações agregadas sobre a coleção
    """
    
    def __init__(self):
        """
        Inicializa o gerenciador com lista vazia de estudantes.
        """
        self.estudantes = []
    
    def adicionar_estudante(self, estudante):
        """
        Adiciona um estudante à lista.
        
        Args:
            estudante (Estudante): Objeto estudante a adicionar
        
        INSTRUÇÃO CHAVE:
        ----------------
        - isinstance(): Verifica tipo do objeto
        - Type checking para garantir consistência
        """
        if isinstance(estudante, Estudante):
            self.estudantes.append(estudante)
        else:
            print("⚠ Erro: Objeto fornecido não é um Estudante!")
    
    def obter_aprovados(self):
        """
        Retorna lista de estudantes aprovados.
        
        Returns:
            list: Lista de estudantes aprovados
        
        INSTRUÇÃO CHAVE:
        ----------------
        - List comprehension: [expr for item in lista if condição]
        - Sintaxe concisa e eficiente para filtrar listas
        """
        return [est for est in self.estudantes if est.esta_aprovado()]
    
    def obter_reprovados(self):
        """
        Retorna lista de estudantes reprovados.
        """
        return [est for est in self.estudantes if not est.esta_aprovado()]
    
    def calcular_media_turma(self):
        """
        Calcula a média geral da turma.
        
        Returns:
            float: Média geral da turma
        
        INSTRUÇÃO CHAVE:
        ----------------
        - Generator expression: (expr for item in lista)
        - Mais eficiente em memória que list comprehension
        - sum() pode trabalhar diretamente com generators
        """
        if not self.estudantes:
            return 0.0
        
        soma_medias = sum(est.calcular_media() for est in self.estudantes)
        media_turma = soma_medias / len(self.estudantes)
        return round(media_turma, 2)
    
    def exibir_relatorio_completo(self):
        """
        Exibe relatório completo da turma.
        
        INSTRUÇÃO CHAVE:
        ----------------
        - Formatação complexa com múltiplas chamadas a métodos
        - Separação de aprovados e reprovados
        """
        print("\n" + "=" * 60)
        print("RELATÓRIO COMPLETO DA TURMA")
        print("=" * 60)
        
        print(f"\n📊 Estatísticas Gerais:")
        print(f"   Total de estudantes: {len(self.estudantes)}")
        print(f"   Média da turma: {self.calcular_media_turma():.2f}")
        
        aprovados = self.obter_aprovados()
        reprovados = self.obter_reprovados()
        
        print(f"   Aprovados: {len(aprovados)}")
        print(f"   Reprovados: {len(reprovados)}")
        
        if aprovados:
            print(f"\n✅ ESTUDANTES APROVADOS:")
            for est in aprovados:
                print(f"   • {est}")
        
        if reprovados:
            print(f"\n❌ ESTUDANTES REPROVADOS:")
            for est in reprovados:
                print(f"   • {est}")
        
        print("\n" + "=" * 60)


def main():
    """
    Função principal que demonstra o uso do sistema OOP.
    
    FLUXO DO PROGRAMA:
    ------------------
    1. Criar instâncias de Estudante
    2. Adicionar ao gerenciador
    3. Exibir informações individuais
    4. Exibir relatório consolidado
    """
    print("\n" + "=" * 60)
    print("SISTEMA DE GERENCIAMENTO DE ESTUDANTES - VERSÃO OOP")
    print("=" * 60)
    
    # Criar gerenciador
    gerenciador = GerenciadorEstudantes()
    
    # Criar instâncias de estudantes
    # INSTRUÇÃO CHAVE: Instanciação de objetos com Classe()
    estudante1 = Estudante("Ana Silva", [85, 92, 78, 88, 90])
    estudante2 = Estudante("Carlos Santos", [55, 62, 48, 58, 52])
    estudante3 = Estudante("Maria Oliveira", [95, 98, 100, 94, 97])
    estudante4 = Estudante("João Ferreira", [70, 75, 68, 72, 71])
    estudante5 = Estudante("Beatriz Costa", [45, 50, 42, 48, 51])
    estudante6 = Estudante("Pedro Alves", [80, 85, 82, 88, 84])
    
    # Adicionar estudantes ao gerenciador
    print("\n📝 Adicionando estudantes ao sistema...")
    estudantes = [estudante1, estudante2, estudante3, 
                  estudante4, estudante5, estudante6]
    
    for est in estudantes:
        gerenciador.adicionar_estudante(est)
    
    print(f"✓ {len(estudantes)} estudantes adicionados com sucesso!")
    
    # Exibir informações individuais
    print("\n" + "=" * 60)
    print("INFORMAÇÕES INDIVIDUAIS DOS ESTUDANTES")
    print("=" * 60)
    
    for est in gerenciador.estudantes:
        est.exibir_informacoes()
    
    # Exibir relatório consolidado
    gerenciador.exibir_relatorio_completo()


if __name__ == "__main__":
    """
    Ponto de entrada do programa.
    
    INSTRUÇÃO CHAVE:
    ----------------
    - Garante execução apenas quando script é executado diretamente
    """
    main()
