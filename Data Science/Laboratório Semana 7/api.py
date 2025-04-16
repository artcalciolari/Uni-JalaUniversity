import joblib
import numpy as np
import time
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
import uvicorn # para executar o servidor

MODEL_PATH = "./joblib/final_cancer_classifier.joblib"
SCALER_PATH = "./joblib/scaler.joblib"

# --- Configuração inicial ---
app = FastAPI(
  title="API de Classificação de Câncer de Mama",
  description="Recebe 30 características de amostras de tecido e classifica como Maligno ou Benigno.",
  version="1.0.0"
)

# --- Carregar o modelo já treinado ---
# Carregamos ele fora das funções de endpoint para que não seja carregado mais de uma vez

try:
  model = joblib.load(MODEL_PATH)
  scaler = joblib.load(SCALER_PATH)
  print("Modelo e scaler carregados com sucesso.")
except FileNotFoundError:
  print("ERRO: Arquivos 'final_cancer_classifier.joblib' ou 'scaler.joblib' não encontrados.")
  print("Execute o script de treinamento ('model_training.py') primeiro.")
  model = None
  scaler = None
except Exception as e:
  print(f"Erro ao carregar o modelo ou scaler: {e}")
  model = None
  scaler = None

# Mapeamento de classes para nome legível
class_names = {0: 'Maligno', 1: 'Benigno'}

# --- Definição do Input (Payload da requisição) ---
class FeaturesInput(BaseModel):
  features: List[float] = Field(..., example=[17.99, 10.38, 122.8, 1001.0, 0.1184, 0.2776, 0.3001, 0.1471, 0.2419, 0.07871, 1.095, 0.9053, 8.589, 153.4, 0.006399, 0.04904, 0.05373, 0.01587, 0.03003, 0.006193, 25.38, 17.33, 184.6, 2019.0, 0.1622, 0.6656, 0.7119, 0.2654, 0.4601, 0.1189])

  # Validação customizada (opcional mas recomendado)
  model_config = {
      "json_schema_extra": {
          "examples": [
              {
                  "features": [17.99, 10.38, 122.8, 1001.0, 0.1184, 0.2776, 0.3001, 0.1471, 0.2419, 0.07871, 1.095, 0.9053, 8.589, 153.4, 0.006399, 0.04904, 0.05373, 0.01587, 0.03003, 0.006193, 25.38, 17.33, 184.6, 2019.0, 0.1622, 0.6656, 0.7119, 0.2654, 0.4601, 0.1189]
              }
          ]
      }
  }

  # Adicionando validação para garantir que a lista tenha exatamente 30 elementos
  @classmethod
  def __get_validators__(cls):
      yield cls.validate_features_length
  
  @classmethod
  def validate_features_length(cls, v):
    if 'features' in v and len(v['features']) != 30:
          raise ValueError(f"A lista 'features' deve conter exatamente 30 valores numéricos. Recebido: {len(v['features'])}")
    # Checagem adicional para garantir que os números sejam float ou int
    if 'features' in v and not all(isinstance(item, (int, float)) for item in v['features']):
          raise ValueError("Todos os itens na lista 'features' devem ser numéricos.")
    return v
  

# --- Definição do Output (Resposta da API) ---
class PredicitionOutput(BaseModel):
    prediction: str = Field(..., example="Maligno")
    prediction_label: int = Field(..., example=0)
    inference_time_ms: float = Field(..., example=0.5)
    model_info: str = Field(default="Modelo Scikit-learn WDBC", example="Modelo Scikit-learn WDBC")


# --- Endpoint para previsão ---
@app.post("/predict", response_model=PredicitionOutput)
async def predict_cancer(data: FeaturesInput):
   """
   Recebe 30 características da amostra e retorna a classificação (Maligno ou Benigno) junto com o tempo de inferência.
   """

   if model is None or scaler is None:
      raise HTTPException(status_code=503, detail="Modelo ou Scaler não está carregado. API não operacional.")
   
   try:
      # 1. Validar e converter input (Pydantic já fez a validação básica de tipo e tamanho)
      features_array = np.array(data.features).reshape(1, -1)  # Converter para array 2D

      # 2. Pré-processar (escalonar) os dados
      start_time = time.perf_counter()
      scaled_features = scaler.transform(features_array)

      # 3. fazer a previsão
      prediction_label = model.predict(scaled_features)[0]

      # 4. Calcular o tempo de inferência
      end_time = time.perf_counter()
      inference_time_ms = (end_time - start_time) * 1000  # converter para milissegundos

      # 5. Mapear a previsão para o nome legível
      prediction_name = class_names.get(prediction_label, "Classe Desconhecida")

      if inference_time_ms >= 100:
        print(f"ALERTA: Inferência levou {inference_time_ms:.2f} ms (>= 100ms) para a requisição.")

      # 6. Retornar o resultado
      return PredicitionOutput(
        prediction=prediction_name,
        prediction_label=prediction_label,
        inference_time_ms=inference_time_ms,
        model_info=type(model).__name__
      )
   except ValueError as ve:
      raise HTTPException(status_code=422, detail=f"Erro nos dados de entrada: {ve}")
   except Exception as e:
      print(f"Erro inesperado: {e}")
      raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {e}")
   
# --- Endpoint raíz ---
@app.get("/", tags=["root"])
async def read_root():
   """
   Endpoint raíz da API. Serve para demonstrar funcionamento.
   """
   return {
      "message": "API de Classificação de Câncer de Mama. Use /predict para previsões.",
      "input_example": {
         "features": [17.99, 10.38, 122.8, 1001.0, 0.1184, 0.2776, 0.3001, 0.1471, 0.2419, 0.07871, 1.095, 0.9053, 8.589, 153.4, 0.006399, 0.04904, 0.05373, 0.01587, 0.03003, 0.006193, 25.38, 17.33, 184.6, 2019.0, 0.1622, 0.6656, 0.7119, 0.2654, 0.4601, 0.1189]
      }
   }

if __name__ == "__main__":
   uvicorn.run("api:app", host="127.0.0.1", port=8000)