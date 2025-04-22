import logging
import os
import re
from typing import List

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class TextCleaner:
    """
    Classe responsável por limpar arquivos de texto em um diretório.
    """

    def __init__(self,
                 raw_docs_folder: str = "data/raw/docs/",
                 processed_docs_folder: str = "data/processed/"):
        """
        Inicializa o TextCleaner.

        Args:
            raw_docs_folder: Caminho para a pasta com documentos brutos.
            processed_docs_folder: Caminho para salvar os documentos processados.
        """
        self.raw_docs_folder = raw_docs_folder
        self.processed_docs_folder = processed_docs_folder
        self._ensure_output_folder()

    def _ensure_output_folder(self):
        """Garante que a pasta de saída exista."""
        try:
            os.makedirs(self.processed_docs_folder, exist_ok=True)
            logging.info(f"Pasta de saída verificada/criada: {self.processed_docs_folder}")
        except Exception as e:
            logging.error(f"Erro ao criar a pasta de saída {self.processed_docs_folder}: {e}")
            raise # Re-levanta a exceção para interromper se não puder criar a pasta

    @staticmethod
    def clean_text(text: str) -> str:
        """
        Remove espaços desnecessários, caracteres não ASCII e menus específicos do GitHub.

        Args:
            text: O texto a ser limpo.

        Returns:
            O texto limpo.
        """
        # Remove menus específicos do GitHub (ajustado para ser mais robusto)
        text = re.sub(r"Navigation Menu.*?(Explore All features|View source on GitHub)", "", text, flags=re.DOTALL | re.IGNORECASE)
        # Remove espaços extras (múltiplos espaços/tabs/newlines) e substitui por um único espaço
        text = re.sub(r"\s+", " ", text)
        # Remove caracteres não ASCII que podem causar problemas
        text = re.sub(r"[^\x00-\x7F]+", "", text)
        # Remove espaços em branco no início e no fim
        text = text.strip()
        return text

    def _list_raw_files(self) -> List[str]:
        """Lista os arquivos na pasta de documentos brutos."""
        if not os.path.exists(self.raw_docs_folder):
            logging.error(f"A pasta de documentos brutos não foi encontrada: {self.raw_docs_folder}")
            return []
        try:
            files = [f for f in os.listdir(self.raw_docs_folder) if os.path.isfile(os.path.join(self.raw_docs_folder, f))]
            logging.info(f"Encontrados {len(files)} arquivos em {self.raw_docs_folder}")
            return files
        except Exception as e:
            logging.error(f"Erro ao listar arquivos em {self.raw_docs_folder}: {e}")
            return []

    def process_single_file(self, filename: str) -> bool:
        """
        Processa um único arquivo: lê, limpa e salva.

        Args:
            filename: O nome do arquivo a ser processado.

        Returns:
            True se o processamento foi bem-sucedido, False caso contrário.
        """
        input_path = os.path.join(self.raw_docs_folder, filename)
        output_path = os.path.join(self.processed_docs_folder, filename)

        try:
            with open(input_path, "r", encoding="utf-8") as f_in:
                text = f_in.read()

            cleaned_text = self.clean_text(text)

            # Evita salvar arquivos vazios após a limpeza, se desejado
            if not cleaned_text:
                 logging.warning(f"Arquivo {filename} ficou vazio após a limpeza. Não será salvo.")
                 # return True # Considera sucesso, pois foi processado, mas resultou em vazio
                 # Ou pode retornar False se um arquivo vazio for um problema
                 return False # Retorna False se um arquivo vazio não deve ser considerado sucesso


            with open(output_path, "w", encoding="utf-8") as f_out:
                f_out.write(cleaned_text)

            return True
        except FileNotFoundError:
             logging.error(f"Arquivo não encontrado: {input_path}")
             return False
        except Exception as e:
            logging.error(f"Erro ao processar o arquivo {filename}: {e}")
            return False

    def run(self):
        """Processa todos os documentos na pasta de entrada."""
        files_to_process = self._list_raw_files()
        total_files = len(files_to_process)

        if total_files == 0:
            logging.warning(f"Nenhum arquivo encontrado para processar em {self.raw_docs_folder}.")
            return

        logging.info(f"Iniciando processamento de {total_files} documentos...")
        success_count = 0
        error_count = 0

        for i, filename in enumerate(files_to_process):
            if self.process_single_file(filename):
                logging.info(f"[{i+1}/{total_files}] Processado: {filename}")
                success_count += 1
            else:
                logging.error(f"[{i+1}/{total_files}] Falha ao processar: {filename}")
                error_count += 1

        logging.info("Processamento concluído.")
        logging.info(f"Total de arquivos: {total_files}")
        logging.info(f"Processados com sucesso: {success_count}")
        logging.info(f"Falhas: {error_count}")


if __name__ == "__main__":
    cleaner = TextCleaner()
    cleaner.run()
