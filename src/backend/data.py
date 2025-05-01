
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import pickle

# Create dummy dataset
np.random.seed(42)
n_samples = 200
features = [
    "ph", "tds", "bod", "do", "nitrate", "chloride", "alkalinity",
    "totalHardness", "conductivity", "calcium", "magnesium"
]

# Generate random values for each feature
X = pd.DataFrame(np.random.rand(n_samples, len(features)) * 100, columns=features)

# Generate a dummy WQI value (somewhat influenced by features, for realism)
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

# Train a RandomForestRegressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# Save the model to a file
model_path = "/wqi_model.pkl"
with open(model_path, "wb") as f:
    pickle.dump(model, f)

model_path
