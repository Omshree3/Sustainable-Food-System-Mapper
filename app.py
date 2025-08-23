from flask import Flask, render_template, jsonify, request
from geopy.distance import geodesic

app = Flask(__name__)

# Example in-memory storage
donors = [
    {"id": 1, "name": "Local Bakery", "lat": 37.7749, "lng": -122.4194, "food": "Bread"},
]
recipients = [
    {"id": 1, "name": "Community Shelter", "lat": 37.7849, "lng": -122.4094, "need": "Bread"},
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def data():
    return jsonify({"donors": donors, "recipients": recipients})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
