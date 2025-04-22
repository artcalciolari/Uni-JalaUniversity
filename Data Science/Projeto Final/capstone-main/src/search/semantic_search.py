import os
import pickle
import logging
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class SemanticSearcher:
    """
    Classe responsável por carregar embeddings, realizar busca semântica
    e exibir resultados.
    """

    def __init__(self,
                 embeddings_file: str = "embeddings/document_embeddings.pkl",
                 processed_docs_folder: str = "data/processed/",
                 model_name: str = "sentence-transformers/all-mpnet-base-v2"):
        """
        Inicializa o SemanticSearcher.

        Args:
            embeddings_file: Caminho para o arquivo de embeddings.
            processed_docs_folder: Caminho para a pasta com documentos processados.
            model_name: Nome ou caminho do modelo SentenceTransformer.
        """
        self.embeddings_file = embeddings_file
        self.processed_docs_folder = processed_docs_folder
        self.model_name = model_name
        self.model = self._load_model()
        self.doc_names = None
        self.doc_embeddings = None
        self._load_embeddings() # Carrega os embeddings na inicialização

    def _load_model(self) -> SentenceTransformer:
        """Carrega o modelo SentenceTransformer."""
        logging.info(f"Carregando modelo: {self.model_name}")
        try:
            model = SentenceTransformer(self.model_name)
            logging.info("Modelo carregado com sucesso.")
            return model
        except Exception as e:
            logging.error(f"Erro ao carregar o modelo {self.model_name}: {e}")
            raise

    def _load_embeddings(self):
        """Carrega os embeddings armazenados e os armazena na instância."""
        if not os.path.exists(self.embeddings_file):
            logging.error(f"Arquivo de embeddings não encontrado: {self.embeddings_file}. Execute generate_embeddings.py primeiro.")
            # Define como None para que outras funções possam verificar
            self.doc_names = None
            self.doc_embeddings = None
            return

        try:
            with open(self.embeddings_file, "rb") as f:
                embeddings_dict = pickle.load(f)
            self.doc_names = list(embeddings_dict.keys())
            self.doc_embeddings = np.array(list(embeddings_dict.values()))
            logging.info(f"{len(self.doc_names)} embeddings carregados de {self.embeddings_file}")
        except Exception as e:
            logging.error(f"Erro ao carregar embeddings do arquivo {self.embeddings_file}: {e}")
            self.doc_names = None
            self.doc_embeddings = None


    def search(self, query: str, top_n: int = 5) -> list:
        """Realiza busca semântica nos documentos e retorna os mais relevantes."""
        if self.doc_names is None or self.doc_embeddings is None:
            logging.error("Os embeddings não foram carregados corretamente. Não é possível realizar a busca.")
            return []

        if not query:
            logging.warning("Consulta de busca vazia.")
            return []

        logging.info(f"Realizando busca pela consulta: '{query}'")
        try:
            # Gerar embedding da consulta
            query_embedding = self.model.encode(query, convert_to_numpy=True)

            # Calcular similaridade de cosseno
            similarities = cosine_similarity([query_embedding], self.doc_embeddings)[0]

            # Ordenar e obter os top_n resultados
            # argsort retorna índices do menor para o maior, pegamos os últimos N e invertemos
            top_indices = np.argsort(similarities)[-top_n:][::-1]

            results = [(self.doc_names[i], float(similarities[i])) for i in top_indices] # Converte similaridade para float padrão
            logging.info(f"Busca concluída. {len(results)} resultados encontrados.")
            return results
        except Exception as e:
            logging.error(f"Erro durante a busca semântica para a consulta '{query}': {e}")
            return []


    def display_document_content(self, doc_name: str, max_chars: int = 1000):
        """Exibe o conteúdo formatado de um documento específico."""
        if not doc_name:
            logging.warning("Nome do documento para exibição está vazio.")
            return

        # Valida se o doc_name solicitado existe na lista carregada
        if self.doc_names and doc_name not in self.doc_names:
             logging.error(f"Documento '{doc_name}' não encontrado nos embeddings carregados.")
             print(f"❌ Erro: Documento '{doc_name}' não encontrado na lista.")
             return

        doc_path = os.path.join(self.processed_docs_folder, doc_name)

        if not os.path.exists(doc_path):
            logging.error(f"Arquivo do documento não encontrado em: {doc_path}")
            print(f"❌ Erro: O arquivo {doc_name} não foi encontrado na pasta de processados.")
            return

        try:
            with open(doc_path, "r", encoding="utf-8") as f:
                content = f.read()

            print(f"\n📄 **Conteúdo do documento: {doc_name}**\n")
            print(content[:max_chars])
            if len(content) > max_chars:
                print("\n[... Documento truncado para visualização ...]\n")
            else:
                print("\n[Fim do documento]\n")

        except Exception as e:
            logging.error(f"Erro ao ler ou exibir o conteúdo do documento {doc_name}: {e}")
            print(f"❌ Erro ao tentar exibir o documento {doc_name}.")

    def run_interactive_search(self):
        """Executa o loop interativo de busca."""
        if self.doc_names is None or self.doc_embeddings is None:
            print("Erro crítico: Embeddings não puderam ser carregados. Encerrando.")
            logging.critical("Encerrando busca interativa devido à falha no carregamento dos embeddings.")
            return

        print("Sistema de Busca Semântica Inicializado.")
        while True:
            try:
                query = input("Digite sua busca (ou 'sair' para encerrar): ").strip()
                if query.lower() == "sair":
                    print("Encerrando...")
                    break
                if not query:
                    continue # Pede nova entrada se for vazia

                results = self.search(query)

                if not results:
                    print("Nenhum resultado relevante encontrado.")
                    continue

                print("\n📌 Resultados mais relevantes:\n")
                for i, (doc, score) in enumerate(results):
                    print(f"{i+1}. {doc} → Similaridade: {score:.4f}")

                # Loop para visualização de documentos
                while True:
                    doc_choice = input(
                        "\n📖 Digite o NÚMERO do documento para visualizar, nome completo, ou 'voltar' para nova busca: "
                    ).strip()

                    if doc_choice.lower() == "voltar":
                        break # Sai do loop de visualização, volta para a busca

                    selected_doc_name = None
                    if doc_choice.isdigit():
                        choice_index = int(doc_choice) - 1
                        if 0 <= choice_index < len(results):
                            selected_doc_name = results[choice_index][0]
                        else:
                            print("Número inválido.")
                    # Permite digitar o nome completo também
                    elif doc_choice in [res[0] for res in results]:
                         selected_doc_name = doc_choice
                    else:
                         # Verifica se o nome digitado existe, mesmo não estando nos top results atuais
                         if self.doc_names and doc_choice in self.doc_names:
                             print(f"Aviso: '{doc_choice}' não está nos top resultados atuais, mas existe.")
                             selected_doc_name = doc_choice
                         else:
                             print(f"Documento '{doc_choice}' não reconhecido nos resultados ou na lista geral.")


                    if selected_doc_name:
                        self.display_document_content(selected_doc_name)

            except KeyboardInterrupt:
                print("\nEncerrando por interrupção do usuário.")
                break
            except Exception as e:
                logging.exception("Erro inesperado no loop interativo.") # Loga o traceback completo
                print(f"Ocorreu um erro inesperado: {e}. Tente novamente.")


if __name__ == "__main__":
    searcher = SemanticSearcher()
    searcher.run_interactive_search()
