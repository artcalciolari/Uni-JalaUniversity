import os
import pickle
import logging
import numpy as np
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from scipy.spatial import ConvexHull
import umap

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class EmbeddingVisualizer:
    """
    Classe responsável por carregar embeddings e gerar visualizações de clusters.
    """

    def __init__(self, embeddings_file: str = "embeddings/document_embeddings.pkl"):
        """
        Inicializa o EmbeddingVisualizer.

        Args:
            embeddings_file: Caminho para o arquivo de embeddings.
        """
        self.embeddings_file = embeddings_file
        self.doc_names = None
        self.doc_embeddings = None
        self._load_embeddings()

    def _load_embeddings(self):
        """Carrega os embeddings armazenados e os armazena na instância."""
        if not os.path.exists(self.embeddings_file):
            logging.error(f"Arquivo de embeddings não encontrado: {self.embeddings_file}. Execute generate_embeddings.py primeiro.")
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

    def _reduce_dimensionality(self, embeddings, method: str):
        """Reduz a dimensionalidade dos embeddings usando o método especificado."""
        logging.info(f"Reduzindo dimensionalidade com {method.upper()}...")
        try:
            if method == "tsne":
                # Redução intermediária com PCA pode ajudar t-SNE em alta dimensão
                if embeddings.shape[1] > 50:
                     pca_dim = min(50, embeddings.shape[1])
                     logging.info(f"Aplicando PCA intermediário para {pca_dim} dimensões antes do t-SNE.")
                     embeddings = PCA(n_components=pca_dim, random_state=42).fit_transform(embeddings)

                perplexity_value = min(30, max(5, len(embeddings) - 1)) # Ajusta perplexity
                logging.info(f"Usando perplexity={perplexity_value} para t-SNE.")
                reduced = TSNE(n_components=2, perplexity=perplexity_value, random_state=42, n_jobs=-1).fit_transform(embeddings)
            elif method == "umap":
                n_neighbors_value = min(15, max(5, len(embeddings) - 1)) # Ajusta n_neighbors
                logging.info(f"Usando n_neighbors={n_neighbors_value} para UMAP.")
                reduced = umap.UMAP(n_components=2, n_neighbors=n_neighbors_value, random_state=42).fit_transform(embeddings)
            elif method == "pca":
                reduced = PCA(n_components=2, random_state=42).fit_transform(embeddings)
            else:
                logging.error(f"Método de redução desconhecido: {method}. Use 'tsne', 'umap' ou 'pca'.")
                return None
            logging.info(f"Redução de dimensionalidade com {method.upper()} concluída.")
            return reduced
        except Exception as e:
            logging.error(f"Erro durante a redução de dimensionalidade com {method.upper()}: {e}")
            return None

    def _cluster_embeddings(self, embeddings, n_clusters: int):
        """Agrupa os embeddings usando K-Means."""
        logging.info(f"Agrupando documentos em {n_clusters} clusters usando K-Means...")
        try:
            kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
            cluster_labels = kmeans.fit_predict(embeddings)
            logging.info("Agrupamento K-Means concluído.")
            return cluster_labels
        except Exception as e:
            logging.error(f"Erro durante o agrupamento K-Means: {e}")
            return None

    def _extract_cluster_keywords(self, cluster_labels, n_clusters):
        """Extrai palavras-chave representativas para cada cluster."""
        if self.doc_names is None:
            logging.error("Nomes dos documentos não carregados, não é possível extrair keywords.")
            return {i: f"Cluster {i+1}" for i in range(n_clusters)}

        logging.info("Extraindo palavras-chave dos clusters...")
        cluster_keywords = {}
        stop_words = {
            "and", "the", "to", "of", "in", "for", "on", "with", "by", "a",
            "an", "is", "it", "are", "this", "that", "there", "their", "as", "at",
            "be", "or", "an", "if", "from", "using", "how", "use", "get", "set",
            "vs", "do", "not", "your", "you", "me", "my", "we", "our", "ours",
            "like", "via", "up", "down", "out", "over", "under", "again", "further",
            "then", "once", "here", "there", "when", "where", "why", "how", "all",
            "any", "both", "each", "few", "more", "most", "other", "some", "such",
            "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very",
            "s", "t", "can", "will", "just", "don", "should", "now", "js", "go"
        }

        for cluster_id in range(n_clusters):
            docs_in_cluster = [self.doc_names[i] for i, label in enumerate(cluster_labels) if label == cluster_id]
            if not docs_in_cluster:
                cluster_keywords[cluster_id] = f"Cluster {cluster_id+1} (vazio)"
                continue

            all_words = []
            for doc in docs_in_cluster:
                clean_doc = doc.replace('.txt', '').replace('_', ' ').replace('-', ' ')
                all_words.extend(clean_doc.split())

            word_freq = {}
            for word in all_words:
                word_lower = word.lower()
                if word_lower not in stop_words and len(word_lower) > 2 and not word_lower.isdigit():
                    word_freq[word_lower] = word_freq.get(word_lower, 0) + 1

            # Selecionar as 3 palavras mais frequentes
            top_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:3]
            if top_words:
                cluster_keywords[cluster_id] = ", ".join(word for word, _ in top_words)
            else:
                # Fallback: usar parte do nome do primeiro documento se não houver palavras-chave
                fallback_name = docs_in_cluster[0].replace('.txt', '').replace('_', ' ')[:15]
                cluster_keywords[cluster_id] = f"{fallback_name}..."

        logging.info("Extração de palavras-chave concluída.")
        return cluster_keywords

    def plot_clean(self, reduction_method: str):
        """Gera uma visualização simples dos embeddings reduzidos."""
        if self.doc_embeddings is None:
            logging.error("Embeddings não carregados. Não é possível gerar a visualização.")
            print("Erro: Embeddings não carregados.")
            return None

        reduced_embeddings = self._reduce_dimensionality(self.doc_embeddings, reduction_method)
        if reduced_embeddings is None:
            return None

        fig, ax = plt.subplots(figsize=(12, 8))
        ax.scatter(reduced_embeddings[:, 0], reduced_embeddings[:, 1], alpha=0.7)
        ax.set_title(f"Visualização Simples de Embeddings ({reduction_method.upper()})")
        ax.set_xlabel("Componente 1")
        ax.set_ylabel("Componente 2")
        plt.tight_layout()
        return fig

    def plot_clustered(self, reduction_method: str, n_clusters: int):
        """Gera uma visualização dos embeddings agrupados e reduzidos."""
        if self.doc_embeddings is None or self.doc_names is None:
            logging.error("Embeddings ou nomes de documentos não carregados.")
            print("Erro: Embeddings ou nomes de documentos não carregados.")
            return None

        # 1. Agrupar os embeddings originais
        cluster_labels = self._cluster_embeddings(self.doc_embeddings, n_clusters)
        if cluster_labels is None:
            return None

        # 2. Reduzir a dimensionalidade dos embeddings originais
        reduced_embeddings = self._reduce_dimensionality(self.doc_embeddings, reduction_method)
        if reduced_embeddings is None:
            return None

        # 3. Extrair palavras-chave
        cluster_keywords = self._extract_cluster_keywords(cluster_labels, n_clusters)

        # 4. Plotar
        fig, ax = plt.subplots(figsize=(18, 14))
        colors = plt.cm.tab20(np.linspace(0, 1, n_clusters))
        centroids = []

        # Desenhar Convex Hulls e calcular centroides
        for i in range(n_clusters):
            cluster_points = reduced_embeddings[cluster_labels == i]
            if len(cluster_points) > 0:
                centroids.append(np.mean(cluster_points, axis=0))
                if len(cluster_points) >= 3:
                    try:
                        hull = ConvexHull(cluster_points)
                        # Desenhar o polígono do hull
                        for simplex in hull.simplices:
                            ax.fill(cluster_points[simplex, 0], cluster_points[simplex, 1],
                                    color=colors[i % len(colors)], alpha=0.25, edgecolor='grey', linewidth=0.5)
                    except Exception as e:
                        logging.warning(f"Não foi possível criar Convex Hull para o cluster {i}: {e}")
            else:
                 centroids.append(None) # Placeholder for empty clusters

        # Plotar os pontos
        ax.scatter(
            reduced_embeddings[:, 0],
            reduced_embeddings[:, 1],
            c=[colors[label % len(colors)] for label in cluster_labels],
            s=60,
            alpha=0.8,
            edgecolors='black',
            linewidths=0.5
        )

        # Adicionar anotações dos clusters
        for i in range(n_clusters):
             if centroids[i] is not None:
                docs_count = np.sum(cluster_labels == i)
                font_size = min(14, 8 + (docs_count / len(self.doc_names)) * 8)
                ax.annotate(
                    cluster_keywords[i],
                    (centroids[i][0], centroids[i][1]),
                    fontsize=font_size,
                    ha='center',
                    va='center',
                    weight='bold',
                    bbox=dict(
                        boxstyle="round,pad=0.5",
                        fc="white",
                        ec=colors[i % len(colors)],
                        lw=2,
                        alpha=0.9
                    )
                )

        ax.set_title(f"Visualização de Clusters por Similaridade ({reduction_method.upper()}, {n_clusters} clusters)", fontsize=16)
        ax.axis('off')
        plt.tight_layout()
        return fig

    def run_interactive_visualization(self):
        """Executa o processo interativo para escolher e gerar a visualização."""
        if self.doc_names is None or self.doc_embeddings is None:
            print("⚠ Erro: Não foi possível carregar os embeddings. Verifique o arquivo e logs.")
            return

        print("\nEscolha o tipo de visualização:")
        print("1. Visualização Simples (sem clusters)")
        print("2. Visualização por Clusters (agrupada)")
        viz_choice = input("Digite 1 ou 2: ").strip()

        while viz_choice not in ["1", "2"]:
            print("Opção inválida.")
            viz_choice = input("Digite 1 ou 2: ").strip()

        method = input("\nEscolha o método de redução de dimensionalidade (tsne, umap, pca): ").strip().lower()
        while method not in ["tsne", "umap", "pca"]:
            print("Método inválido.")
            method = input("Escolha o método (tsne, umap, pca): ").strip().lower()

        fig = None
        if viz_choice == "1":
            fig = self.plot_clean(method)
        else:
            n_clusters_input = input("\nNúmero de clusters desejado (ex: 10): ").strip()
            try:
                n_clusters = int(n_clusters_input)
                if n_clusters <= 1 or n_clusters > len(self.doc_names):
                     print(f"Número de clusters inválido. Deve ser entre 2 e {len(self.doc_names)}.")
                     return
                fig = self.plot_clustered(method, n_clusters)
            except ValueError:
                print("Entrada inválida para número de clusters. Deve ser um número inteiro.")
                return

        if fig:
            print("\nGerando gráfico... Feche a janela do gráfico para continuar.")
            plt.show()
        else:
            print("\nNão foi possível gerar o gráfico devido a erros anteriores.")


if __name__ == "__main__":
    visualizer = EmbeddingVisualizer()
    visualizer.run_interactive_visualization()
