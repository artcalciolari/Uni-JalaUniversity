import os
import json
import requests
from bs4 import BeautifulSoup
import logging

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class DocumentationDownloader:
    """
    Classe responsável por baixar o conteúdo textual de URLs listadas em um arquivo JSON.
    """

    def __init__(self, links_file: str = "data/raw/awesome_links.json", output_folder: str = "data/raw/docs/"):
        """
        Inicializa o DocumentationDownloader.

        Args:
            links_file: Caminho para o arquivo JSON contendo os links.
            output_folder: Caminho para a pasta onde os arquivos de texto serão salvos.
        """
        self.links_file = links_file
        self.output_folder = output_folder
        self._ensure_output_folder()

    def _ensure_output_folder(self):
        """Garante que a pasta de saída exista."""
        try:
            os.makedirs(self.output_folder, exist_ok=True)
            logging.info(f"Pasta de saída verificada/criada: {self.output_folder}")
        except Exception as e:
            logging.error(f"Erro ao criar a pasta de saída {self.output_folder}: {e}")
            raise

    @staticmethod
    def _clean_text(text: str) -> str:
        """Remove espaços desnecessários e normaliza o texto."""
        # Remove múltiplos espaços/tabs/newlines e substitui por um único espaço
        text = " ".join(text.split())
        return text.strip()

    def _read_links(self) -> list:
        """Lê a lista de links do arquivo JSON."""
        if not os.path.exists(self.links_file):
            logging.error(f"Arquivo de links não encontrado: {self.links_file}. Execute extract_links.py primeiro.")
            return []
        try:
            with open(self.links_file, "r", encoding="utf-8") as f:
                links = json.load(f)
            logging.info(f"{len(links)} links carregados de {self.links_file}")
            return links
        except json.JSONDecodeError as e:
            logging.error(f"Erro ao decodificar JSON do arquivo {self.links_file}: {e}")
            return []
        except Exception as e:
            logging.error(f"Erro ao ler o arquivo de links {self.links_file}: {e}")
            return []

    def _download_and_save_single_doc(self, link_info: dict, index: int, total: int) -> bool:
        """
        Baixa, limpa e salva o conteúdo de uma única URL.

        Args:
            link_info: Dicionário contendo 'url' e 'title'.
            index: Índice atual do link (para logging).
            total: Número total de links (para logging).

        Returns:
            True se o download e salvamento foram bem-sucedidos, False caso contrário.
        """
        url = link_info.get("url")
        title = link_info.get("title", f"document_{index}") # Usa um título padrão se não houver
        safe_title = title.replace(" ", "_").replace("/", "_").lower() # Torna o título seguro para nome de arquivo
        file_path = os.path.join(self.output_folder, f"{safe_title}.txt")

        if not url:
            logging.warning(f"[{index + 1}/{total}] Link inválido (sem URL): {link_info}")
            return False

        try:
            response = requests.get(url, timeout=15) # Aumentado timeout
            response.raise_for_status() # Verifica erros HTTP (4xx ou 5xx)

            # Extrair o texto da página HTML
            soup = BeautifulSoup(response.content, "html.parser") # Usa response.content para melhor detecção de encoding
            text = soup.get_text()
            cleaned_text = self._clean_text(text)

            if not cleaned_text:
                logging.warning(f"[{index + 1}/{total}] Conteúdo vazio após limpeza para {url}. Arquivo não salvo.")
                return False # Ou True se um arquivo vazio for aceitável

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(cleaned_text)

            logging.info(f"[{index + 1}/{total}] Sucesso: {safe_title} (de {url})")
            return True
        except requests.exceptions.RequestException as e:
            logging.error(f"[{index + 1}/{total}] Erro de rede/HTTP ao baixar {url}: {e}")
            return False
        except Exception as e:
            logging.error(f"[{index + 1}/{total}] Erro inesperado ao processar {url}: {e}")
            return False

    def run(self):
        """Executa o processo completo de download e salvamento."""
        links = self._read_links()
        if not links:
            logging.warning("Nenhum link para processar.")
            return

        total = len(links)
        logging.info(f"Iniciando download de {total} documentações...")
        success_count = 0
        error_count = 0

        for i, link_info in enumerate(links):
            if self._download_and_save_single_doc(link_info, i, total):
                success_count += 1
            else:
                error_count += 1

        logging.info("Download concluído.")
        logging.info(f"Total de links: {total}")
        logging.info(f"Downloads com sucesso: {success_count}")
        logging.info(f"Falhas: {error_count}")


if __name__ == "__main__":
    downloader = DocumentationDownloader()
    downloader.run()
