import re
import string
import unittest
from collections import defaultdict

def jaccard_similarity(set1, set2):
    """
    Calcula a similaridade de Jaccard entre dois conjuntos.
    """
    if not set1 and not set2:
        return 0
    intersection = set1.intersection(set2)
    union = set1.union(set2)
    return len(intersection) / len(union)

class RecommendationSystem:
    def __init__(self, users, articles):
        """
        Inicializa o sistema com:
          - users: dicionário {user_id: [lista de article_ids consumidos]}
          - articles: dicionário {article_id: {"title": str, "description": str}}
        Pré-computa os tokens dos artigos.
        """
        self.users = users
        self.articles = articles
        # Pré-computação dos tokens para cada artigo
        self.article_tokens = {}
        for art_id, data in self.articles.items():
            processed_text = self.pre_process(data['description'])
            self.article_tokens[art_id] = set(self.tokenize(processed_text))
    
    def pre_process(self, text):
        """
        Método de pré-processamento: converte para minúsculas e remove pontuação.
        """
        # Converter para minúsculas
        text = text.lower()
        # Remover pontuação usando regex
        text = re.sub(r'[' + re.escape(string.punctuation) + ']', '', text)
        return text

    def tokenize(self, text):
        """
        Método de tokenização: separa o texto por espaços.
        """
        return text.split()

    def recommend(self, target_user, weight_content=0.5, weight_collab=0.5):
        """
        Gera recomendações para o target_user combinando:
          1. Similaridade de conteúdo (descrição dos artigos)
          2. Similaridade colaborativa (artigos consumidos por usuários similares)

        Para cada artigo candidato (não consumido pelo target_user):
          - content_score: similaridade máxima (Jaccard) entre os tokens do artigo candidato 
            e os tokens dos artigos que o usuário consumiu.
          - collab_score: soma das similaridades (Jaccard) entre o target_user e outros usuários 
            que consumiram o artigo candidato (baseada na interseção de artigos consumidos).

        A pontuação final é a combinação ponderada:
            score = weight_content * content_score + weight_collab * collab_score

        Retorna uma lista de tuplas (article_id, score) ordenadas decrescentemente.
        """
        if target_user not in self.users:
            raise ValueError("Usuário não encontrado no sistema.")

        consumed = set(self.users[target_user])
        candidate_articles = [aid for aid in self.articles if aid not in consumed]
        recommendations = []

        # Pré-compute tokens dos artigos consumidos pelo usuário
        consumed_tokens = [self.article_tokens[aid] for aid in consumed if aid in self.article_tokens]

        # Cálculo da similaridade colaborativa:
        # Para cada outro usuário, calculamos a similaridade (Jaccard) com o target_user
        user_similarities = {}
        target_set = consumed
        for user, arts in self.users.items():
            if user == target_user:
                continue
            other_set = set(arts)
            user_similarities[user] = jaccard_similarity(target_set, other_set)
        
        for candidate in candidate_articles:
            # Conteúdo: comparar os tokens do candidato com cada artigo consumido; usamos o máximo
            candidate_tokens = self.article_tokens[candidate]
            content_scores = [jaccard_similarity(candidate_tokens, tokens) for tokens in consumed_tokens]
            content_score = max(content_scores) if content_scores else 0

            # Colaborativo: soma das similaridades dos usuários que consumiram o candidato
            collab_score = 0
            for user, sim in user_similarities.items():
                if candidate in self.users[user]:
                    collab_score += sim

            # Combinação ponderada dos scores
            final_score = weight_content * content_score + weight_collab * collab_score
            recommendations.append((candidate, final_score))

        # Ordena as recomendações por pontuação final (decrescente)
        recommendations.sort(key=lambda x: x[1], reverse=True)
        
        # Filtra recomendações com pontuação maior que 0.10
        filtered_recommendations = [(aid, score) for aid, score in recommendations if score > 0.10]
        
        return filtered_recommendations

# Dados de exemplo
articles = {
    1: {"title": "Tech News: AI Advances", "description": "Artificial intelligence is progressing rapidly."},
    2: {"title": "Sports: Football Highlights", "description": "The football match was exciting and full of surprises."},
    3: {"title": "Health: Nutrition Tips", "description": "Eating vegetables and fruits is beneficial for health."},
    4: {"title": "Tech Trends: New Gadgets", "description": "Latest gadgets and tech trends in the market."},
    5: {"title": "Sports: Basketball Analysis", "description": "Basketball game analysis and player statistics."},
    6: {"title": "Health: Workout Routines", "description": "Effective workout routines for a healthy body."}
}

users = {
    "user1": [1, 3],
    "user2": [2, 5],
    "user3": [1, 4, 6],
    "user4": [3, 6]
}

# Testes unitários
class TestRecommendationSystem(unittest.TestCase):
    def setUp(self):
        self.rec_sys = RecommendationSystem(users, articles)
    
    def test_pre_process(self):
        text = "Hello, World! This is a Test."
        processed = self.rec_sys.pre_process(text)
        expected = "hello world this is a test"
        self.assertEqual(processed, expected)
    
    def test_tokenize(self):
        text = "hello world this is a test"
        tokens = self.rec_sys.tokenize(text)
        expected = ["hello", "world", "this", "is", "a", "test"]
        self.assertEqual(tokens, expected)
    
    def test_recommendations_output(self):
        # Verifica que o método não retorne recomendações para usuário inexistente
        with self.assertRaises(ValueError):
            self.rec_sys.recommend("user_inexistente")
        
        # Verifica que para "user1" as recomendações retornem artigos não consumidos
        recs = self.rec_sys.recommend("user1")
        consumed = set(users["user1"])
        for art_id, score in recs:
            self.assertNotIn(art_id, consumed)
        
        # Verifica que as recomendações estejam ordenadas (score decrescente)
        scores = [score for _, score in recs]
        self.assertEqual(scores, sorted(scores, reverse=True))
    
    def test_jaccard_similarity(self):
        # Testa a função jaccard_similarity com exemplos simples
        self.assertAlmostEqual(jaccard_similarity(set("abc"), set("abc")), 1.0)
        self.assertAlmostEqual(jaccard_similarity(set("ab"), set("bc")), 1/3)
        self.assertAlmostEqual(jaccard_similarity(set(), set()), 0)

if __name__ == "__main__":
    # Instancia o sistema de recomendações
    rec_sys = RecommendationSystem(users, articles)
    
    for user in users:
        print(f"Recomendações para {user}:")
        recs = rec_sys.recommend(user)
        if not recs:
            print("Sem recomendações. Tente novamente após ler mais alguns artigos")
        else:
            for article, score in recs:
                print(f"  - {articles[article]['title']} (score: {score:.2f})")
    
    # Execução dos testes unitários
    unittest.main(argv=['first-arg-is-ignored'], exit=False)