"""
Versão Funcional
Gerenciamento de lista de números inteiros usando programação funcional
"""

from functools import reduce


def obter_pares(numeros):
    """
    Filtra e retorna apenas os números pares da lista.

    Args:
        numeros (list): Lista de números inteiros

    Returns:
        list: Lista contendo apenas os números pares
    """
    return list(filter(lambda x: x % 2 == 0, numeros))


def calcular_media(numeros):
    """
    Calcula a média aritmética dos números usando reduce.

    Args:
        numeros (list): Lista de números inteiros

    Returns:
        float: Média dos números
    """
    if len(numeros) == 0:
        return 0

    soma = reduce(lambda acc, x: acc + x, numeros, 0)
    media = soma / len(numeros)
    return media


def exibir_informacoes(numeros, pares, media):
    """
    Exibe as informações no console.

    Args:
        numeros (list): Lista original
        pares (list): Lista de números pares
        media (float): Média calculada
    """
    print("=" * 50)
    print("VERSÃO FUNCIONAL")
    print("=" * 50)
    print(f"Lista original: {numeros}")
    print(f"Números pares: {pares}")
    print(f"Média da lista: {media:.2f}")
    print("=" * 50)


# Programa principal
if __name__ == "__main__":
    # Lista predefinida
    numeros = [2, 5, 8, 11, 14]

    # Aplicar funções
    pares = obter_pares(numeros)
    media = calcular_media(numeros)

    # Exibir resultados
    exibir_informacoes(numeros, pares, media)
