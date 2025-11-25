# --- TOKENIZER (LEXER) ---
def tokenize(expression):
    """
    Converte a string de entrada em uma lista de tokens.
    Ex: "3 + 5 * 2" -> [3.0, '+', 5.0, '*', 2.0]
    """
    tokens = []
    current_number = ""

    # Remove espaços para facilitar o processamento
    expression = expression.replace(" ", "")

    i = 0
    while i < len(expression):
        char = expression[i]

        # Se for dígito ou ponto decimal, construímos o número
        if char.isdigit() or char == ".":
            current_number += char
        else:
            # Se encontramos um operador, salvamos o número acumulado antes
            if current_number:
                tokens.append(float(current_number))
                current_number = ""

            # Adiciona o operador
            if char in "+-*/":
                tokens.append(char)
            else:
                raise ValueError(f"Caractere inválido: {char}")
        i += 1

    # Adiciona o último número, se houver
    if current_number:
        tokens.append(float(current_number))

    return tokens


# --- PARSER & EVALUATOR (Recursive Descent) ---
class Interpreter:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def current_token(self):
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return None

    def eat(self, token_type):
        """Consome o token atual se ele corresponder ao esperado, senão erro."""
        self.pos += 1

    def factor(self):
        """
        Analisa um número.
        Fator == NÚMERO
        """
        token = self.current_token()
        if isinstance(token, float):
            self.eat("NUMBER")
            return token
        raise ValueError("Erro de sintaxe: Esperado um número.")

    def term(self):
        """
        Analisa multiplicações e divisões (alta precedência).
        """
        result = self.factor()

        while self.current_token() in ("*", "/"):
            op = self.current_token()
            self.eat(op)
            right = self.factor()

            if op == "*":
                result = result * right
            elif op == "/":
                if right == 0:
                    raise ZeroDivisionError("Divisão por zero.")
                result = result / right

        return result

    def expr(self):
        """
        Analisa somas e subtrações (baixa precedência).
        """
        result = self.term()

        while self.current_token() in ("+", "-"):
            op = self.current_token()
            self.eat(op)
            right = self.term()

            if op == "+":
                result = result + right
            elif op == "-":
                result = result - right

        return result


def evaluate(expression):
    try:
        tokens = tokenize(expression)
        interpreter = Interpreter(tokens)
        return interpreter.expr()
    except Exception as e:
        return f"Erro: {e}"


# --- TESTES ---
if __name__ == "__main__":
    test_cases = [
        "3 + 5 * 2",  # Esperado: 13 (Multiplicação antes da soma)
        "10 - 2 * 3",  # Esperado: 4
        "100 / 2 + 50",  # Esperado: 100
        "3.5 + 4.5",  # Esperado: 8.0
    ]

    print("--- Testes do Intérprete ---")
    for test in test_cases:
        result = evaluate(test)
        # Comparação com eval() apenas para validação, como solicitado
        expected = eval(test)
        print(f"Expr: {test:<15} | Resultado: {result:<5} | Oracle (eval): {expected}")
