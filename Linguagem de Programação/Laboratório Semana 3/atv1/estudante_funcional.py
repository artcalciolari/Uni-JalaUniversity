"""
SISTEMA DE GERENCIAMENTO DE ESTUDANTES - VERSÃO FUNCIONAL
==========================================================

Este programa implementa um sistema usando paradigma funcional para gerenciar
informações de estudantes, calcular médias e verificar aprovação.

CONCEITOS FUNCIONAIS UTILIZADOS:
---------------------------------
1. Funções puras: Não modificam estado externo
2. Imutabilidade: Dados não são alterados, novos dados são criados
3. Higher-order functions: map, filter, reduce
4. Composição de funções: Combinar funções simples
5. List comprehensions: Sintaxe funcional do Python
"""

from functools import reduce


# DADOS: Representação de estudantes como dicionários (estrutura de dados)
# INSTRUÇÃO CHAVE: Dicionários são estruturas imutáveis quando usados funcionalmente
ESTUDANTES = [
    {"nome": "Ana Silva", "notas": [85, 92, 78, 88, 90]},
    {"nome": "Carlos Santos", "notas": [55, 62, 48, 58, 52]},
    {"nome": "Maria Oliveira", "notas": [95, 98, 100, 94, 97]},
    {"nome": "João Ferreira", "notas": [70, 75, 68, 72, 71]},
    {"nome": "Beatriz Costa", "notas": [45, 50, 42, 48, 51]},
    {"nome": "Pedro Alves", "notas": [80, 85, 82, 88, 84]}
]

# Constante
NOTA_MINIMA_APROVACAO = 60.0


# ============================================================================
# FUNÇÕES PURAS - Não modificam estado, apenas transformam dados
# ============================================================================

def calcular_media(notas):
    """
    Calcula a média de uma lista de notas.
    
    Args:
        notas (list): Lista de notas
    
    Returns:
        float: Média aritmética das notas
    
    INSTRUÇÃO CHAVE:
    ----------------
    - Função pura: mesmo input sempre produz mesmo output
    - Não tem efeitos colaterais (não modifica variáveis externas)
    - sum() e len() são funções built-in funcionais
    """
    if not notas:
        return 0.0
    return round(sum(notas) / len(notas), 2)


def esta_aprovado(media):
    """
    Verifica se média é suficiente para aprovação.
    
    Args:
        media (float): Média do estudante
    
    Returns:
        bool: True se aprovado, False caso contrário
    
    INSTRUÇÃO CHAVE:
    ----------------
    - Função pura que retorna booleano
    - Predicado: função que retorna True ou False
    """
    return media >= NOTA_MINIMA_APROVACAO


def obter_status(media):
    """
    Retorna string de status baseado na média.
    
    Args:
        media (float): Média do estudante
    
    Returns:
        str: Status de aprovação
    """
    return "APROVADO" if esta_aprovado(media) else "REPROVADO"


def adicionar_media(estudante):
    """
    Adiciona campo de média ao dicionário do estudante.
    
    Args:
        estudante (dict): Dicionário com dados do estudante
    
    Returns:
        dict: Novo dicionário com campo 'media' adicionado
    
    INSTRUÇÃO CHAVE:
    ----------------
    - Imutabilidade: não modifica o dicionário original
    - **estudante: spread operator, copia todos os campos
    - {**dict, novo_campo: valor}: cria novo dict com campo adicional
    """
    return {
        **estudante,
        "media": calcular_media(estudante["notas"])
    }


def adicionar_status(estudante):
    """
    Adiciona campo de status ao dicionário do estudante.
    
    Args:
        estudante (dict): Dicionário com dados do estudante (deve ter 'media')
    
    Returns:
        dict: Novo dicionário com campo 'status' adicionado
    """
    return {
        **estudante,
        "status": obter_status(estudante["media"])
    }


# ============================================================================
# HIGHER-ORDER FUNCTIONS - Funções que operam sobre outras funções
# ============================================================================

def processar_estudantes(estudantes):
    """
    Processa lista de estudantes adicionando médias e status.
    
    Args:
        estudantes (list): Lista de dicionários de estudantes
    
    Returns:
        list: Nova lista com dados processados
    
    INSTRUÇÃO CHAVE - MAP:
    ----------------------
    - map(função, iterável): Aplica função a cada elemento
    - Retorna iterador (convertido para lista com list())
    - Transformação de dados sem loops explícitos
    - Composição: aplica adicionar_status(adicionar_media(x))
    """
    # Primeira transformação: adiciona média
    estudantes_com_media = list(map(adicionar_media, estudantes))
    
    # Segunda transformação: adiciona status
    estudantes_processados = list(map(adicionar_status, estudantes_com_media))
    
    return estudantes_processados


def filtrar_aprovados(estudantes):
    """
    Filtra estudantes aprovados.
    
    Args:
        estudantes (list): Lista de estudantes processados
    
    Returns:
        list: Lista contendo apenas aprovados
    
    INSTRUÇÃO CHAVE - FILTER:
    --------------------------
    - filter(predicado, iterável): Filtra elementos que satisfazem condição
    - predicado: função que retorna True/False
    - lambda: função anônima inline
    - lambda x: expressão: define função de uma linha
    """
    # Usando filter com lambda
    return list(filter(lambda est: esta_aprovado(est["media"]), estudantes))


def filtrar_reprovados(estudantes):
    """
    Filtra estudantes reprovados.
    """
    return list(filter(lambda est: not esta_aprovado(est["media"]), estudantes))


def calcular_media_turma(estudantes):
    """
    Calcula média geral da turma.
    
    Args:
        estudantes (list): Lista de estudantes processados
    
    Returns:
        float: Média geral da turma
    
    INSTRUÇÃO CHAVE - REDUCE:
    --------------------------
    - reduce(função, iterável, inicial): Reduz lista a valor único
    - função recebe (acumulador, elemento_atual)
    - acumulador mantém resultado parcial
    - Padrão fold/reduce comum em programação funcional
    """
    if not estudantes:
        return 0.0
    
    # Reduce soma todas as médias
    soma_medias = reduce(
        lambda acumulador, estudante: acumulador + estudante["media"],
        estudantes,
        0  # Valor inicial do acumulador
    )
    
    return round(soma_medias / len(estudantes), 2)


def obter_melhor_media(estudantes):
    """
    Encontra a maior média entre os estudantes.
    
    INSTRUÇÃO CHAVE - REDUCE:
    --------------------------
    - Uso alternativo de reduce para encontrar máximo
    - max() é mais idiomático, mas reduce demonstra flexibilidade
    """
    if not estudantes:
        return 0.0
    
    return reduce(
        lambda max_media, estudante: max(max_media, estudante["media"]),
        estudantes,
        0
    )


def obter_pior_media(estudantes):
    """
    Encontra a menor média entre os estudantes.
    """
    if not estudantes:
        return 0.0
    
    return reduce(
        lambda min_media, estudante: min(min_media, estudante["media"]),
        estudantes,
        100  # Valor inicial alto
    )


# ============================================================================
# FUNÇÕES DE APRESENTAÇÃO - Pure functions para formatação
# ============================================================================

def formatar_estudante(estudante):
    """
    Formata informações de um estudante como string.
    
    INSTRUÇÃO CHAVE:
    ----------------
    - f-strings para formatação
    - join() para concatenar lista de notas
    """
    notas_str = ", ".join(map(str, estudante["notas"]))
    return (f"{estudante['nome']} - "
            f"Notas: [{notas_str}] - "
            f"Média: {estudante['media']:.2f} - "
            f"{estudante['status']}")


def exibir_estudantes(estudantes, titulo):
    """
    Exibe lista de estudantes formatada.
    
    INSTRUÇÃO CHAVE - LIST COMPREHENSION:
    --------------------------------------
    - [expr for item in lista]: Sintaxe funcional do Python
    - Equivalente a map mas mais pythônico
    - Cria nova lista aplicando expressão a cada elemento
    """
    print(f"\n{titulo}")
    
    # List comprehension para formatar todos os estudantes
    linhas_formatadas = [f"   • {formatar_estudante(est)}" for est in estudantes]
    
    # Imprime todas as linhas
    for linha in linhas_formatadas:
        print(linha)


def exibir_estatisticas(estudantes, aprovados, reprovados):
    """
    Exibe estatísticas gerais da turma.
    
    INSTRUÇÃO CHAVE:
    ----------------
    - Composição de funções: chama múltiplas funções puras
    - Todas as estatísticas são calculadas sem modificar dados originais
    """
    print(f"\n📊 Estatísticas Gerais:")
    print(f"   Total de estudantes: {len(estudantes)}")
    print(f"   Média da turma: {calcular_media_turma(estudantes):.2f}")
    print(f"   Melhor média: {obter_melhor_media(estudantes):.2f}")
    print(f"   Pior média: {obter_pior_media(estudantes):.2f}")
    print(f"   Aprovados: {len(aprovados)}")
    print(f"   Reprovados: {len(reprovados)}")
    print(f"   Taxa de aprovação: {(len(aprovados)/len(estudantes)*100):.1f}%")


# ============================================================================
# PIPELINE FUNCIONAL - Composição de transformações
# ============================================================================

def pipeline_analise_estudantes(estudantes_raw):
    """
    Pipeline funcional completo de análise.
    
    CONCEITO DE PIPELINE:
    ---------------------
    1. Processar (map): adiciona média e status
    2. Filtrar (filter): separa aprovados e reprovados
    3. Agregar (reduce): calcula estatísticas
    4. Apresentar: exibe resultados
    
    INSTRUÇÃO CHAVE:
    ----------------
    - Composição funcional: resultado de uma função entra na próxima
    - Dados fluem pela pipeline sem modificação
    - Cada etapa cria novos dados (imutabilidade)
    """
    # Etapa 1: Processar dados (MAP)
    estudantes_processados = processar_estudantes(estudantes_raw)
    
    # Etapa 2: Filtrar dados (FILTER)
    aprovados = filtrar_aprovados(estudantes_processados)
    reprovados = filtrar_reprovados(estudantes_processados)
    
    # Etapa 3: Agregar estatísticas (REDUCE implícito nas funções)
    # Não precisa armazenar, as funções de exibição farão as reduções
    
    # Etapa 4: Apresentar resultados
    return estudantes_processados, aprovados, reprovados


def main():
    """
    Função principal que coordena execução funcional.
    
    FLUXO FUNCIONAL:
    ----------------
    1. Dados imutáveis (constante ESTUDANTES)
    2. Pipeline de transformações
    3. Apresentação de resultados
    4. Dados originais nunca modificados
    """
    print("\n" + "=" * 70)
    print("SISTEMA DE GERENCIAMENTO DE ESTUDANTES - VERSÃO FUNCIONAL")
    print("=" * 70)
    
    # Executa pipeline funcional
    estudantes_processados, aprovados, reprovados = pipeline_analise_estudantes(ESTUDANTES)
    
    # Exibe relatório
    print("\n" + "=" * 70)
    print("RELATÓRIO COMPLETO DA TURMA")
    print("=" * 70)
    
    # Estatísticas
    exibir_estatisticas(estudantes_processados, aprovados, reprovados)
    
    # Listas detalhadas
    if aprovados:
        exibir_estudantes(aprovados, "\n✅ ESTUDANTES APROVADOS:")
    
    if reprovados:
        exibir_estudantes(reprovados, "\n❌ ESTUDANTES REPROVADOS:")
    
    # Todos os estudantes
    exibir_estudantes(estudantes_processados, "\n📋 TODOS OS ESTUDANTES:")
    
    print("\n" + "=" * 70)
    
    # Demonstração de imutabilidade
    print("\n🔍 DEMONSTRAÇÃO DE IMUTABILIDADE:")
    print("   Dados originais não foram modificados!")
    print(f"   Estudante original tem 'media'? {'media' in ESTUDANTES[0]}")
    print(f"   Estudante processado tem 'media'? {'media' in estudantes_processados[0]}")
    print("\n" + "=" * 70)


if __name__ == "__main__":
    """
    Ponto de entrada do programa.
    """
    main()
