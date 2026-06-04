import pandas as pd
import pickle

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Load Dataset
data = pd.read_csv("traffic_dataset.csv")

# Label Encoders
city_encoder = LabelEncoder()
area_encoder = LabelEncoder()
traffic_encoder = LabelEncoder()

data["City"] = city_encoder.fit_transform(data["City"])
data["Area"] = area_encoder.fit_transform(data["Area"])
data["Traffic"] = traffic_encoder.fit_transform(data["Traffic"])

# Features
X = data[["City", "Area", "Hour", "Weather", "DayType"]]

# Target
y = data["Traffic"]

# Train Model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

# Save Model
pickle.dump(model, open("traffic_model.pkl", "wb"))
pickle.dump(city_encoder, open("city_encoder.pkl", "wb"))
pickle.dump(area_encoder, open("area_encoder.pkl", "wb"))
pickle.dump(traffic_encoder, open("traffic_encoder.pkl", "wb"))

print("Traffic Prediction Model Trained Successfully!")