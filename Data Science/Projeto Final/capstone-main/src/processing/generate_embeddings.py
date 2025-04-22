import logging
import os
import pickle
from typing import Dict, List

import numpy as np
from sentence_transformers import SentenceTransformer

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class EmbeddingGenerator:
    """
    Classe responsável por gerar e salvar embeddings de documentos.
    """

    def __init__(self,
                 processed_docs_folder: str = "data/processed/",
                 embeddings_file: str = "embeddings/document_embeddings.pkl",
                 model_name: str = "sentence-transformers/all-mpnet-base-v2"):
        """
        Inicializa o EmbeddingGenerator.

        Args:
            processed_docs_folder: Caminho para a pasta com documentos processados.
            embeddings_file: Caminho para salvar o arquivo de embeddings.
            model_name: Nome ou caminho do modelo SentenceTransformer.
        """
        self.processed_docs_folder = processed_docs_folder
        self.embeddings_file = embeddings_file
        self.model_name = model_name
        self.model = self._load_model()
        self.embeddings_folder = os.path.dirname(embeddings_file)

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

    def _read_documents(self) -> Dict[str, str]:
        """Lê os documentos da pasta de processados."""
        documents = {}
        if not os.path.exists(self.processed_docs_folder):
            logging.error(f"A pasta de documentos processados não foi encontrada: {self.processed_docs_folder}")
            return documents # Retorna dicionário vazio se a pasta não existe

        logging.info(f"Lendo documentos de: {self.processed_docs_folder}")
        filenames = []
        contents = []
        for filename in os.listdir(self.processed_docs_folder):
            file_path = os.path.join(self.processed_docs_folder, filename)
            if os.path.isfile(file_path): # Garante que é um arquivo
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        filenames.append(filename)
                        contents.append(f.read())
                except Exception as e:
                    logging.warning(f"Erro ao ler o arquivo {filename}: {e}")
            else:
                logging.warning(f"Ignorando item que não é arquivo: {filename}")
        logging.info(f"{len(filenames)} documentos lidos.")
        return dict(zip(filenames, contents))


    def _generate_embeddings(self, documents: Dict[str, str]) -> Dict[str, np.ndarray]:
        """Gera embeddings para os documentos fornecidos."""
        doc_embeddings = {}
        if not documents:
            logging.warning("Nenhum documento fornecido para gerar embeddings.")
            return doc_embeddings

        logging.info("Gerando embeddings...")
        filenames = list(documents.keys())
        contents = list(documents.values())

        try:
            # Processa em lote para eficiência
            embeddings = self.model.encode(contents, convert_to_numpy=True, show_progress_bar=True)
            doc_embeddings = dict(zip(filenames, embeddings))
            logging.info(f"{len(doc_embeddings)} embeddings gerados.")
        except Exception as e:
            logging.error(f"Erro durante a geração de embeddings: {e}")

        return doc_embeddings

    def _save_embeddings(self, doc_embeddings: Dict[str, np.ndarray]):
        """Salva os embeddings em um arquivo pickle."""
        if not doc_embeddings:
            logging.warning("Nenhum embedding para salvar.")
            return

        try:
            # Garante que o diretório de embeddings exista
            os.makedirs(self.embeddings_folder, exist_ok=True)
            with open(self.embeddings_file, "wb") as f:
                pickle.dump(doc_embeddings, f)
            logging.info(f"✅ Embeddings salvos com sucesso em {self.embeddings_file}")
        except Exception as e:
            logging.error(f"Erro ao salvar os embeddings no arquivo {self.embeddings_file}: {e}")

    def run(self):
        """Executa o processo completo: ler documentos, gerar embeddings e salvar."""
        documents = self._read_documents()
        if not documents:
            logging.error("Processo interrompido: não foi possível ler os documentos.")
            return

        doc_embeddings = self._generate_embeddings(documents)
        if not doc_embeddings:
             logging.error("Processo interrompido: não foi possível gerar os embeddings.")
             return

        self._save_embeddings(doc_embeddings)
        logging.info("Processo de geração de embeddings concluído.")


if __name__ == "__main__":
    # Instancia e executa o gerador com as configurações padrão
    generator = EmbeddingGenerator()
    generator.run()
