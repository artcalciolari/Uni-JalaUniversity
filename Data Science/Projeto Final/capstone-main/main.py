import os
import time
import subprocess
from src.scraping.extract_links import LinkExtractor
from src.scraping.download_docs import DocumentationDownloader
from src.processing.text_cleaning import TextCleaner
from src.processing.generate_embeddings import EmbeddingGenerator

# Definir caminhos dos arquivos principais
LINKS_FILE = "data/raw/awesome_links.json"
RAW_DOCS_FOLDER = "data/raw/docs/"
PROCESSED_DOCS_FOLDER = "data/processed/"
EMBEDDINGS_FILE = "embeddings/document_embeddings.pkl"

def run_pipeline():
    """Executa as etapas do pipeline antes de iniciar o dashboard usando as classes refatoradas"""
    print("\n🚀 Iniciando o pipeline de processamento de documentação técnica...\n")

    if not os.path.exists(LINKS_FILE):
        print("🔗 Extraindo links das documentações...")
        try:
            # Instancia e executa o extrator de links
            link_extractor = LinkExtractor()
            link_extractor.run() # Assume que run() extrai e salva
            # Verifica se o arquivo foi criado após a execução
            if os.path.exists(LINKS_FILE):
                 # Contar links pode ser mais complexo agora, dependendo da implementação da classe
                 # Poderia ler o arquivo json para contar, mas vamos simplificar a mensagem por enquanto
                 print(f"✅ Links extraídos e salvos com sucesso em {LINKS_FILE}!")
            else:
                 print("⚠ O processo de extração de links foi concluído, mas o arquivo não foi encontrado.")
                 return # Interrompe se a extração falhar
        except Exception as e:
            print(f"❌ Erro ao extrair links: {e}")
            return # Interrompe se houver erro
    else:
        print("✅ Links já extraídos. Pulando esta etapa.")

    time.sleep(1)

    # Verifica se a pasta de documentos brutos está vazia ou não existe
    # Usar os.path.exists e verificar se está vazio é mais robusto
    if not os.path.exists(RAW_DOCS_FOLDER) or not os.listdir(RAW_DOCS_FOLDER):
        print("\n📥 Baixando documentações...")
        try:
            # Instancia e executa o downloader
            downloader = DocumentationDownloader()
            downloader.run()
            # A verificação de sucesso pode ser feita pela classe ou verificando a pasta novamente
            if os.path.exists(RAW_DOCS_FOLDER) and os.listdir(RAW_DOCS_FOLDER):
                 print("✅ Download das documentações concluído.")
            else:
                 print("⚠ O processo de download foi concluído, mas a pasta de documentos brutos está vazia ou não existe.")
                 # Considerar se deve interromper ou continuar
        except Exception as e:
            print(f"❌ Erro ao baixar documentações: {e}")
            # Considerar se deve interromper
    else:
        print("✅ Documentações já baixadas. Pulando esta etapa.")

    time.sleep(1)

    # Verifica se a pasta de documentos processados está vazia ou não existe
    if not os.path.exists(PROCESSED_DOCS_FOLDER) or not os.listdir(PROCESSED_DOCS_FOLDER):
        print("\n🧹 Limpando e estruturando os textos...")
        try:
            # Instancia e executa o limpador de texto
            cleaner = TextCleaner()
            cleaner.run()
            if os.path.exists(PROCESSED_DOCS_FOLDER) and os.listdir(PROCESSED_DOCS_FOLDER):
                 print("✅ Limpeza dos textos concluída.")
            else:
                 print("⚠ O processo de limpeza foi concluído, mas a pasta de documentos processados está vazia ou não existe.")
                 # Considerar se deve interromper
        except Exception as e:
            print(f"❌ Erro ao limpar textos: {e}")
            # Considerar se deve interromper
    else:
        print("✅ Textos já processados. Pulando esta etapa.")

    time.sleep(1)

    if not os.path.exists(EMBEDDINGS_FILE):
        print("\n🧠 Gerando embeddings para os documentos...")
        try:
            # Instancia e executa o gerador de embeddings
            generator = EmbeddingGenerator()
            generator.run()
            if os.path.exists(EMBEDDINGS_FILE):
                 print("✅ Geração de embeddings concluída.")
            else:
                 print("⚠ O processo de geração de embeddings foi concluído, mas o arquivo não foi encontrado.")
                 return # Interrompe se a geração falhar
        except Exception as e:
            print(f"❌ Erro ao gerar embeddings: {e}")
            return # Interrompe se houver erro
    else:
        print("✅ Embeddings já gerados. Pulando esta etapa.")

    print("\n✅ Pipeline concluído com sucesso!")

def start_dashboard():
    """Inicia o dashboard do Streamlit corretamente"""
    print("\n🌐 Iniciando o Dashboard do Streamlit...\n")
    subprocess.run(["streamlit", "run", "app/dashboard.py", "--server.fileWatcherType","none"])

if __name__ == "__main__":
    run_pipeline()
    start_dashboard()
