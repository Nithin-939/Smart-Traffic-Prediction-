from flask import Flask, render_template, request, jsonify
import pickle

app = Flask(__name__)

# Load Model
model = pickle.load(open("traffic_model.pkl", "rb"))

city_encoder = pickle.load(open("city_encoder.pkl", "rb"))
area_encoder = pickle.load(open("area_encoder.pkl", "rb"))
traffic_encoder = pickle.load(open("traffic_encoder.pkl", "rb"))


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    city = request.form["city"]
    area = request.form["area"]

    hour = int(request.form["hour"])
    weather = int(request.form["weather"])
    daytype = int(request.form["day"])

    city_encoded = city_encoder.transform([city])[0]
    area_encoded = area_encoder.transform([area])[0]

    prediction = model.predict([
        [
            city_encoded,
            area_encoded,
            hour,
            weather,
            daytype
        ]
    ])

    traffic_level = traffic_encoder.inverse_transform(prediction)[0]

    return jsonify({
        "city": city,
        "area": area,
        "traffic": traffic_level
    })


if __name__ == "__main__":
    app.run(debug=True)