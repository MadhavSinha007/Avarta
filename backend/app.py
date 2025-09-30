from flask import Flask, request, jsonify

app = Flask(__name__)

# Home route
@app.route("/")
def home():
    return "server is online"

# Example API route
@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify({"message": "Here is some data", "status": "success"})

# Example POST route
@app.route("/api/submit", methods=["POST"])
def submit_data():
    data = request.json
    return jsonify({"you_sent": data, "status": "received"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
