def transpile(input_file, output_file):
    try:
        with open(input_file, "r", encoding="utf-8") as reader:
            lines = reader.readlines()
    except FileNotFoundError:
        print(f"Erro: O arquivo '{input_file}' não foi encontrado.")
        return

    js_lines = []

    for line in lines:
        line = line.strip()
        if not line:
            continue  # Pula linhas vazias

        # Lógica de Parsing (Análise) e Geração de Código
        if line.startswith("PRINT"):
            content = line[5:].strip()  # Pega tudo após PRINT
            js_lines.append(f"console.log({content});")

        elif line.startswith("SOMA"):
            args = line[4:].strip()
            parts = args.split(",")
            if len(parts) == 2:
                js_lines.append(
                    f"console.log({parts[0].strip()} + {parts[1].strip()});"
                )
            else:
                print(f"Erro de sintaxe na linha: {line}")

        elif line.startswith("SUBTRAÇÃO"):
            args = line[9:].strip()
            parts = args.split(",")
            if len(parts) == 2:
                js_lines.append(
                    f"console.log({parts[0].strip()} - {parts[1].strip()});"
                )
            else:
                print(f"Erro de sintaxe na linha: {line}")

        else:
            # Comando desconhecido vira comentário no JS para debug (se necessário)
            js_lines.append(f"// Comando não reconhecido {line}")

    with open(output_file, "w", encoding="utf-8") as writer:
        writer.write("// Gerado automaticamente pelo Transpiler\n")
        writer.write("\n".join(js_lines))

    print(f"Transpilação concluída! Verifique arquivo de saída {output_file}")


if __name__ == "__main__":
    transpile("program.txt", "output.js")
