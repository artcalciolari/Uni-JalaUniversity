"""
PROCESSADOR DE TEXTO - ANÁLISE DE FREQUÊNCIA DE PALAVRAS
=========================================================

Este programa lê um arquivo de texto, processa seu conteúdo e identifica
as 5 palavras mais frequentes, salvando os resultados em um arquivo de saída.

INSTRUÇÕES CHAVE:
-----------------
1. Leitura de arquivo com encoding UTF-8
2. Normalização de texto (minúsculas, remoção de pontuação)
3. Uso de dicionário para contagem de frequências
4. Ordenação de dicionário por valores
5. Escrita de resultados em arquivo de saída
"""

import re
from collections import Counter
import os


class ProcessadorTexto:
    """
    Classe responsável por processar texto e analisar frequência de palavras.
    
    ESTRUTURAS USADAS:
    ------------------
    - re: Módulo de expressões regulares para limpeza de texto
    - Counter: Estrutura de dados especializada em contagem
    - Dictionary comprehension: Para processamento eficiente
    """
    
    def __init__(self, arquivo_entrada):
        """
        Inicializa o processador com o caminho do arquivo de entrada.
        
        Args:
            arquivo_entrada (str): Caminho do arquivo a ser processado
        """
        self.arquivo_entrada = arquivo_entrada
        self.texto = ""
        self.palavras = []
        self.frequencias = {}
    
    def ler_arquivo(self):
        """
        Lê o conteúdo do arquivo de texto.
        
        INSTRUÇÕES CHAVE:
        -----------------
        - with: Gerenciador de contexto que fecha o arquivo automaticamente
        - encoding='utf-8': Suporte a caracteres especiais (acentos, etc)
        - read(): Lê todo o conteúdo do arquivo de uma vez
        """
        try:
            with open(self.arquivo_entrada, 'r', encoding='utf-8') as arquivo:
                self.texto = arquivo.read()
            print(f"✓ Arquivo '{self.arquivo_entrada}' lido com sucesso!")
            return True
        except FileNotFoundError:
            print(f"✗ Erro: Arquivo '{self.arquivo_entrada}' não encontrado!")
            return False
        except Exception as e:
            print(f"✗ Erro ao ler arquivo: {e}")
            return False
    
    def processar_texto(self):
        """
        Processa o texto extraindo e normalizando as palavras.
        
        INSTRUÇÕES CHAVE:
        -----------------
        - lower(): Converte todo texto para minúsculas (normalização)
        - re.findall(): Usa regex para extrair apenas palavras (remove pontuação)
        - r'\b\w+\b': Padrão regex que captura palavras completas
          * \b: Limite de palavra
          * \w+: Um ou mais caracteres alfanuméricos
        """
        # Converte para minúsculas para contagem case-insensitive
        texto_minusculo = self.texto.lower()
        
        # Extrai apenas palavras (remove pontuação e espaços)
        self.palavras = re.findall(r'\b\w+\b', texto_minusculo)
        
        print(f"✓ {len(self.palavras)} palavras extraídas do texto.")
    
    def contar_frequencias(self):
        """
        Conta a frequência de cada palavra no texto.
        
        ESTRUTURAS USADAS:
        ------------------
        - Counter: Classe especializada da biblioteca collections
          * Subclasse de dict otimizada para contagem
          * most_common(n): Retorna as n palavras mais frequentes
        - dict(): Conversão explícita para dicionário padrão
        """
        # Counter é mais eficiente que um loop manual para contagem
        contador = Counter(self.palavras)
        self.frequencias = dict(contador)
        
        print(f"✓ Frequência calculada para {len(self.frequencias)} palavras únicas.")
    
    def obter_top_palavras(self, n=5):
        """
        Retorna as n palavras mais frequentes.
        
        Args:
            n (int): Número de palavras a retornar (padrão: 5)
        
        Returns:
            list: Lista de tuplas (palavra, frequência)
        
        INSTRUÇÕES CHAVE:
        -----------------
        - sorted(): Função built-in para ordenação
        - key=lambda: Função anônima para especificar critério de ordenação
        - x[1]: Ordena pelo segundo elemento da tupla (frequência)
        - reverse=True: Ordem decrescente (maior para menor)
        - [:n]: Slice para pegar apenas os n primeiros
        """
        # Ordena o dicionário por valores (frequências) em ordem decrescente
        palavras_ordenadas = sorted(
            self.frequencias.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        return palavras_ordenadas[:n]
    
    def gerar_relatorio(self, arquivo_saida='resultado_frequencias.txt'):
        """
        Gera um relatório com os resultados e salva em arquivo.
        
        Args:
            arquivo_saida (str): Nome do arquivo de saída
        
        INSTRUÇÕES CHAVE:
        -----------------
        - f-strings: Formatação de strings moderna (f"{variavel}")
        - write(): Escreve string no arquivo
        - \n: Caractere de nova linha
        - Formatting com :>3d e :<20s para alinhamento
        """
        top_5 = self.obter_top_palavras(5)
        
        # Prepara o conteúdo do relatório
        relatorio = []
        relatorio.append("=" * 60)
        relatorio.append("ANÁLISE DE FREQUÊNCIA DE PALAVRAS")
        relatorio.append("=" * 60)
        relatorio.append(f"\nArquivo analisado: {self.arquivo_entrada}")
        relatorio.append(f"Total de palavras: {len(self.palavras)}")
        relatorio.append(f"Palavras únicas: {len(self.frequencias)}")
        relatorio.append("\n" + "-" * 60)
        relatorio.append("TOP 5 PALAVRAS MAIS FREQUENTES")
        relatorio.append("-" * 60)
        relatorio.append(f"{'Posição':<10} {'Palavra':<20} {'Frequência':>10}")
        relatorio.append("-" * 60)
        
        for i, (palavra, freq) in enumerate(top_5, 1):
            relatorio.append(f"{i:<10} {palavra:<20} {freq:>10}")
        
        relatorio.append("=" * 60)
        
        # Junta todas as linhas com quebra de linha
        conteudo_relatorio = "\n".join(relatorio)
        
        # Salva em arquivo
        try:
            with open(arquivo_saida, 'w', encoding='utf-8') as arquivo:
                arquivo.write(conteudo_relatorio)
            print(f"\n✓ Relatório salvo em '{arquivo_saida}'")
        except Exception as e:
            print(f"\n✗ Erro ao salvar relatório: {e}")
        
        # Também imprime no console
        print("\n" + conteudo_relatorio)
        
        return conteudo_relatorio


def main():
    """
    Função principal que coordena a execução do programa.
    
    FLUXO DO PROGRAMA:
    ------------------
    1. Criar instância do processador
    2. Ler arquivo de entrada
    3. Processar e normalizar texto
    4. Contar frequências
    5. Gerar e exibir relatório
    """
    print("\n" + "=" * 60)
    print("PROCESSADOR DE TEXTO - ANÁLISE DE FREQUÊNCIA")
    print("=" * 60 + "\n")
    
    # Caminho do arquivo de entrada
    arquivo_entrada = 'texto.txt'
    
    # Cria instância do processador
    processador = ProcessadorTexto(arquivo_entrada)
    
    # Executa o processamento
    if processador.ler_arquivo():
        processador.processar_texto()
        processador.contar_frequencias()
        processador.gerar_relatorio()
    else:
        print("\n✗ Falha no processamento. Verifique o arquivo de entrada.")


if __name__ == "__main__":
    """
    Ponto de entrada do programa.
    
    INSTRUÇÃO CHAVE:
    ----------------
    - if __name__ == "__main__": Garante que main() só execute quando
      o script é executado diretamente (não quando importado como módulo)
    """
    main()
