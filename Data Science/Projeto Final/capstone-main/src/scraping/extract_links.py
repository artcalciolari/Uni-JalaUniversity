import requests
from bs4 import BeautifulSoup
import json
import os
import logging

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class LinkExtractor:
    """
    Classe responsável por extrair links de documentação de um arquivo Markdown
    e salvá-los em formato JSON.
    """

    def __init__(self, url: str = "https://raw.githubusercontent.com/sindresorhus/awesome/main/readme.md",
                 output_file: str = "data/raw/awesome_links.json"):
        """
        Inicializa o LinkExtractor.

        Args:
            url: URL do arquivo Markdown de onde extrair os links.
            output_file: Caminho para salvar o arquivo JSON com os links.
        """
        self.url = url
        self.output_file = output_file
        self.output_folder = os.path.dirname(output_file)
        self._ensure_output_folder()

    def _ensure_output_folder(self):
        """Garante que a pasta de saída exista."""
        try:
            os.makedirs(self.output_folder, exist_ok=True)
            logging.info(f"Pasta de saída verificada/criada: {self.output_folder}")
        except Exception as e:
            logging.error(f"Erro ao criar a pasta de saída {self.output_folder}: {e}")
            raise

    def _fetch_content(self) -> str | None:
        """Busca o conteúdo do Markdown da URL."""
        logging.info(f"Buscando conteúdo de: {self.url}")
        try:
            response = requests.get(self.url, timeout=10)
            response.raise_for_status() # Verifica erros HTTP
            logging.info("Conteúdo buscado com sucesso.")
            return response.text
        except requests.exceptions.RequestException as e:
            logging.error(f"Erro ao acessar o repositório {self.url}: {e}")
            return None

    def _extract_links_from_content(self, content: str) -> list:
        """Extrai links no formato [- Title](url) do conteúdo."""
        if not content:
            return []

        logging.info("Extraindo links do conteúdo...")
        links = []
        lines = content.split("\n")
        for line in lines:
            line = line.strip()
            if line.startswith("- ["):
                try:
                    # Encontra o fim do título e o início da URL
                    title_end = line.find("](")
                    url_end = line.find(")", title_end)

                    if title_end != -1 and url_end != -1:
                        title = line[3:title_end].strip()
                        url = line[title_end + 2:url_end].strip()
                        # Validação básica da URL
                        if url.startswith("http://") or url.startswith("https://"):
                            links.append({"title": title, "url": url})
                        else:
                            logging.warning(f"URL inválida ou relativa ignorada: {url} (linha: {line[:50]}...)")
                except Exception as e:
                    logging.warning(f"Erro ao processar linha: '{line[:50]}...'. Erro: {e}")
                    continue # Pula para a próxima linha em caso de erro

        logging.info(f"{len(links)} links extraídos.")
        return links

    def _save_links(self, links: list):
        """Salva os links extraídos em um arquivo JSON."""
        if not links:
            logging.warning("Nenhum link para salvar.")
            return

        try:
            with open(self.output_file, "w", encoding="utf-8") as f:
                json.dump(links, f, indent=4, ensure_ascii=False)
            logging.info(f"Links salvos com sucesso em {self.output_file}")
        except Exception as e:
            logging.error(f"Erro ao salvar links no arquivo {self.output_file}: {e}")

    def run(self):
        """Executa o processo completo: buscar conteúdo, extrair links e salvar."""
        content = self._fetch_content()
        if content:
            links = self._extract_links_from_content(content)
            self._save_links(links)
            print(f"\n✅ Extração concluída! Total de links válidos extraídos: {len(links)}")
        else:
            print("\n❌ Falha ao buscar conteúdo. Nenhum link foi extraído.")


if __name__ == "__main__":
    extractor = LinkExtractor()
    extractor.run()
