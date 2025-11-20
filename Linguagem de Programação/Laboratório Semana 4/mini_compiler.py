# -- Definição de Tokens --
class Token:
    def __init__(self, type_, value=None) -> None:
        self.type = type_
        self.value = value

    def __repr__(self) -> str:
        return f"{self.type}({self.value})" if self.value else f"{self.type}"


# -- Análise léxica --
def lexer(text) -> list[Token]:
    tokens = []
    i = 0
    while i < len(text):
        char = text[i]

        if char.isspace():
            i += 1
            continue

        if char.isdigit():
            num_str = ""
            while i < len(text) and text[i].isdigit():
                num_str += text[i]
                i += 1
            tokens.append(Token("NUM", int(num_str)))
            continue

        if char == "+":
            tokens.append(Token("PLUS", "+"))
        elif char == "*":
            tokens.append(Token("MUL", "*"))
        elif char == "(":
            tokens.append(Token("LPAREN", "("))
        elif char == ")":
            tokens.append(Token("RPAREN", ")"))
        else:
            raise ValueError(f"Caractere inválido: {char}")
        i += 1
    tokens.append(Token("EOF"))
    return tokens


# -- Análise sintática --
class NumNode:
    def __init__(self, value) -> None:
        self.value = value


class BinOpNode:
    def __init__(self, left, op, right) -> None:
        self.left = left
        self.op = op
        self.right = right


class Parser:
    def __init__(self, tokens) -> None:
        self.tokens = tokens
        self.pos = 0
        self.current = self.tokens[0]

    def consume(self, type_) -> None:
        if self.current.type == type_:
            self.pos += 1
            if self.pos < len(self.tokens):
                self.current = self.tokens[self.pos]
        else:
            raise SyntaxError(f"Esperado {type_}, encontrado {self.current.type}")

    def factor(self):
        """Trata números e parênteses"""
        token = self.current
        if token.type == "NUM":
            self.consume("NUM")
            return NumNode(token.value)
        elif token.type == "LPAREN":
            self.consume("LPAREN")
            node = self.expr()
            self.consume("RPAREN")
            return node
        raise SyntaxError("Fator inválido")

    def term(self):
        """Trata multiplicação"""
        node = self.factor()
        while self.current.type == "MUL":
            op = self.current
            self.consume("MUL")
            node = BinOpNode(node, op, self.factor())
        return node

    def expr(self):
        """Trata adição (precedência baixa)"""
        node = self.term()
        while self.current.type == "PLUS":
            op = self.current
            self.consume("PLUS")
            node = BinOpNode(node, op, self.term())
        return node

    def parse(self):
        return self.expr()


# -- Visualização da árvore --
def print_tree(node, prefix="", is_left=True, is_root=True):
    if not node:
        return

    # Define o valor a ser impresso (Operador ou Número)
    label = f"({node.op.value})" if isinstance(node, BinOpNode) else str(node.value)

    if is_root:
        print(label)
    else:
        connector = "├── " if is_left else "└── "
        print(f"{prefix}{connector}{label}")

    if isinstance(node, BinOpNode):
        new_prefix = prefix + ("| " if is_left and not is_root else " ")
        print_tree(node.left, new_prefix, True, False)
        print_tree(node.right, new_prefix, False, False)


# -- EXECUÇÃO --
if __name__ == "__main__":
    entrada = "2+3*5"

    # Fase 1: Análise léxica
    tokens = lexer(entrada)

    # Fase 2: Análise sintática
    parser = Parser(tokens)
    ast = parser.parse()

    # Saídas
    print(f"Entrada: {entrada}")
    print(f"Tokens: {tokens}")
    print("-" * 20)
    print("Árvore Sintática:")
    print_tree(ast)
