from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = "wqi_model.pkl"  # Save it in the local directory

def load_or_train_model():
    from sklearn.ensemble import RandomForestRegressor

    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)

    else:
        # Dummy training data
        import pandas as pd
        np.random.seed(42)
        n_samples = 200
        features = [
            "ph", "tds", "bod", "do", "nitrate", "chloride", "alkalinity",
            "totalHardness", "conductivity", "calcium", "magnesium"
        ]
        X = pd.DataFrame(np.random.rand(n_samples, len(features)) * 100, columns=features)
        y = (
            0.1 * X["ph"] +
            0.2 * X["tds"] +
            0.15 * X["bod"] +
            0.1 * X["do"] +
            0.1 * X["nitrate"] +
            0.05 * X["chloride"] +
            0.05 * X["alkalinity"] +
            0.05 * X["totalHardness"] +
            0.05 * X["conductivity"] +
            0.05 * X["calcium"] +
            0.1 * X["magnesium"]
        )

        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X, y)

        with open(MODEL_PATH, 'wb') as f:
            pickle.dump(model, f)

    return model

model = load_or_train_model()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received data:", data)

    try:
        all_features = [
            "ph", "tds", "bod", "do", "nitrate", "chloride", "alkalinity",
            "totalHardness", "conductivity", "calcium", "magnesium"
        ]

        # Use only provided inputs, fill missing with mean or 0
        input_vector = []
        for feature in all_features:
            value = data.get(feature)
            input_vector.append(float(value) if value is not None and value != '' else 0.0)

        prediction = model.predict([input_vector])[0]
        return jsonify({"wqi": round(prediction, 2)})

    except Exception as e:
        print("Prediction error:", str(e))
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
