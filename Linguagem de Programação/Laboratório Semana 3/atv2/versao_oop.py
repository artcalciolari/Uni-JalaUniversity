"""
Versão Orientada a Objetos (OOP)
Gerenciamento de lista de números inteiros
"""


class ListaNumeros:
    """
    Classe para gerenciar uma lista de números inteiros.
    Permite obter números pares e calcular a média.
    """

    def __init__(self, numeros):
        """
        Inicializa a lista de números.

        Args:
            numeros (list): Lista de números inteiros
        """
        self.numeros = numeros

    def obter_pares(self):
        """
        Retorna uma lista com apenas os números pares.

        Returns:
            list: Lista contendo apenas os números pares
        """
        pares = []
        for numero in self.numeros:
            if numero % 2 == 0:
                pares.append(numero)
        return pares

    def calcular_media(self):
        """
        Calcula a média aritmética dos números da lista.

        Returns:
            float: Média dos números
        """
        if len(self.numeros) == 0:
            return 0

        soma = sum(self.numeros)
        media = soma / len(self.numeros)
        return media

    def exibir_informacoes(self):
        """
        Exibe todas as informações da lista no console.
        """
        print("=" * 50)
        print("VERSÃO ORIENTADA A OBJETOS (OOP)")
        print("=" * 50)
        print(f"Lista original: {self.numeros}")
        print(f"Números pares: {self.obter_pares()}")
        print(f"Média da lista: {self.calcular_media():.2f}")
        print("=" * 50)


# Programa principal
if __name__ == "__main__":
    # Criar instância com lista predefinida
    lista = ListaNumeros([2, 5, 8, 11, 14])

    # Exibir resultados
    lista.exibir_informacoes()
