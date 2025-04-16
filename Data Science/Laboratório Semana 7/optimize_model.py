import time
import numpy as np
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score

def optimize_models(final_model, final_model_name, X_train_scaled, y_train, X_test_scaled, y_test, sample_indexes):
  # Verificar o tipo do modelo
  from sklearn.svm import SVC
  from sklearn.linear_model import LogisticRegression
  
  if isinstance(final_model, SVC):
    print(f"\nOtimizando {final_model_name} com GridSearchCV...")
    param_grid = {
        'C': [0.1, 1, 10, 100],
        'gamma': [1, 0.1, 0.01, 0.001],
        'kernel': ['rbf', 'linear'] # 'linear' pode ser mais rápido
    }
    grid_search = GridSearchCV(SVC(random_state=42, probability=True), param_grid, refit=True, verbose=0, cv=5, n_jobs=-1)
  elif isinstance(final_model, LogisticRegression):
    print(f"\nOtimizando {final_model_name} com GridSearchCV...")
    param_grid = {
        'C': [0.01, 0.1, 1, 10, 100],
        'solver': ['liblinear', 'lbfgs', 'newton-cg'],
        'penalty': ['l2']
    }
    grid_search = GridSearchCV(LogisticRegression(random_state=42, max_iter=10000), param_grid, refit=True, verbose=0, cv=5, n_jobs=-1)
  else:
    print(f"\nO modelo {final_model_name} não é suportado para otimização. Apenas SVM e LogisticRegression são suportados.")
    return final_model, final_model_name

  start_opt_time = time.time()
  grid_search.fit(X_train_scaled, y_train)
  end_opt_time = time.time()
  opt_time = end_opt_time - start_opt_time

  print(f"Tempo de Otimização: {opt_time:.2f} segundos")
  print(f"Melhores Parâmetros: {grid_search.best_params_}")

  # Avaliar o modelo otimizado
  final_model = grid_search.best_estimator_
  y_pred_optimized = final_model.predict(X_test_scaled)
  accuracy_optimized = accuracy_score(y_test, y_pred_optimized)

  # Re-medir tempo de inferência do modelo otimizado
  inference_times_optimized = []
  for i in sample_indexes: # Usar os mesmos índices para comparação justa
      sample = X_test_scaled[i].reshape(1, -1)
      start_infer_time = time.perf_counter()
      final_model.predict(sample)
      end_infer_time = time.perf_counter()
      inference_times_optimized.append((end_infer_time - start_infer_time) * 1000)

  avg_inference_time_ms_optimized = np.mean(inference_times_optimized)

  print(f"\nDesempenho do Modelo Otimizado ({final_model_name}):")
  print(f"  Acurácia no Teste: {accuracy_optimized:.4f}")
  print(f"  Tempo Médio de Inferência (1 amostra): {avg_inference_time_ms_optimized:.4f} ms")

  # Verificar se ainda atende ao requisito de tempo
  if avg_inference_time_ms_optimized >= 100:
      print("ALERTA: O modelo otimizado excedeu o limite de 100ms de inferência!")
  else:
      final_model_name = f"{final_model_name} (Otimizado)"
  
  return final_model, final_model_name