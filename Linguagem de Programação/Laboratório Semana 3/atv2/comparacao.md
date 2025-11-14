# Comparação: Programação Orientada a Objetos vs Programação Funcional

## Descrição do Projeto

Este projeto implementa um programa em Python que gerencia uma lista de números inteiros, com funcionalidades para obter números pares e calcular a média. O programa foi desenvolvido em duas versões distintas para comparar os paradigmas de programação.

---

## Diferenças no Estilo de Implementação

### 1. **Versão Orientada a Objetos (OOP)**

#### Características:
- **Encapsulamento de dados**: Os dados (lista de números) são armazenados como atributo da classe `ListaNumeros`.
- **Métodos associados ao objeto**: As operações (`obter_pares()` e `calcular_media()`) são métodos que operam sobre o estado interno do objeto.
- **Estado mutável**: O objeto mantém estado (a lista de números) durante sua existência.
- **Reutilização através de instâncias**: Múltiplas instâncias podem ser criadas com diferentes listas.

#### Estrutura:
```python
class ListaNumeros:
    def __init__(self, numeros):
        self.numeros = numeros
    
    def obter_pares(self):
        # Implementação usando loop imperativo
    
    def calcular_media(self):
        # Implementação usando métodos do objeto
```

---

### 2. **Versão Funcional**

#### Características:
- **Funções puras**: As funções não mantêm estado e sempre retornam o mesmo resultado para as mesmas entradas.
- **Imutabilidade**: Os dados de entrada não são modificados pelas funções.
- **Composição de funções**: Uso de funções de alta ordem como `filter()` e `reduce()`.
- **Expressões declarativas**: O código descreve "o que fazer" ao invés de "como fazer".

#### Estrutura:
```python
def obter_pares(numeros):
    return list(filter(lambda x: x % 2 == 0, numeros))

def calcular_media(numeros):
    soma = reduce(lambda acc, x: acc + x, numeros, 0)
    return soma / len(numeros)
```

---

## Principais Diferenças Técnicas

| Aspecto | OOP | Funcional |
|---------|-----|-----------|
| **Organização** | Dados e comportamentos agrupados em classes | Funções independentes que operam sobre dados |
| **Estado** | Mantém estado interno (atributos) | Funções sem estado (stateless) |
| **Reutilização** | Através de instâncias e herança | Através de composição de funções |
| **Filtragem de pares** | Loop `for` imperativo | `filter()` com lambda |
| **Cálculo de média** | `sum()` e divisão simples | `reduce()` para soma funcional |
| **Estilo** | Imperativo (como fazer) | Declarativo (o que fazer) |

---

## Vantagens e Desvantagens

### **Versão OOP**

#### ✅ Vantagens:
1. **Organização intuitiva**: Agrupa dados e operações relacionadas em uma única entidade (classe), facilitando o entendimento da estrutura do código.
2. **Encapsulamento**: Protege os dados e controla como são acessados e modificados.
3. **Facilidade de extensão**: Pode-se adicionar novos métodos facilmente sem afetar o código existente.
4. **Reutilização através de herança**: Permite criar hierarquias de classes para compartilhar comportamentos.

#### ❌ Desvantagens:
1. **Complexidade adicional**: Requer mais código boilerplate (construtores, self, etc.) para tarefas simples.
2. **Estado mutável**: O estado interno pode levar a bugs difíceis de rastrear em programas grandes.
3. **Acoplamento**: As operações estão fortemente acopladas aos dados da classe.
4. **Overhead de memória**: Instâncias de objetos consomem mais memória devido aos atributos e métodos.

---

### **Versão Funcional**

#### ✅ Vantagens:
1. **Código conciso e expressivo**: Uso de funções de alta ordem (`filter`, `reduce`) resulta em código mais limpo e legível.
2. **Testabilidade**: Funções puras são mais fáceis de testar, pois não dependem de estado externo.
3. **Imutabilidade**: Reduz bugs relacionados a mudanças inesperadas de estado.
4. **Paralelização**: Funções sem estado são mais fáceis de executar em paralelo.
5. **Composição**: Fácil combinar funções pequenas para criar operações complexas.

#### ❌ Desvantagens:
1. **Curva de aprendizado**: Conceitos como lambdas, `reduce`, e funções de alta ordem podem ser difíceis para iniciantes.
2. **Performance**: Em alguns casos, funções recursivas ou uso excessivo de `reduce` podem ser menos eficientes que loops imperativos.
3. **Menos intuitivo para dados complexos**: Para estruturas de dados mais complexas, OOP pode oferecer melhor organização.
4. **Debugging**: Stack traces de funções compostas podem ser mais difíceis de entender.

---

## Quando Usar Cada Abordagem?

### **Use OOP quando:**
- Você precisa modelar entidades do mundo real com comportamentos e estados.
- O sistema tem muitas interações entre diferentes tipos de objetos.
- Você precisa de encapsulamento forte e controle de acesso aos dados.
- O projeto se beneficia de hierarquias e herança.

### **Use Funcional quando:**
- Você está processando transformações de dados (ETL, pipelines).
- Precisa de código testável e previsível.
- Quer evitar efeitos colaterais e bugs relacionados a estado.
- Está trabalhando com operações que podem ser paralelizadas.

---

## Conclusão

Ambas as abordagens têm seu lugar no desenvolvimento de software moderno. Python, sendo uma linguagem multiparadigma, permite que você escolha a melhor ferramenta para cada problema:

- **OOP** é excelente para modelar sistemas complexos com muitas entidades interagindo.
- **Funcional** brilha em transformações de dados, processamento de listas, e situações onde previsibilidade e testabilidade são cruciais.

O melhor código frequentemente combina elementos de ambos os paradigmas, usando OOP para estrutura geral e programação funcional para operações de transformação de dados.
