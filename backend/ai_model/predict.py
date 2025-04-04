from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ Load the model and encoder from the new file
data = joblib.load("emotion_model_2.pkl")
model = data["model"]
label_encoder = data["encoder"]

@app.route("/api/predict-emotion", methods=["POST"])
def predict_emotion():
    try:
        data = request.get_json()
        print("📥 Incoming data:", data)

        amount = float(data.get("amount"))
        category = data.get("category")
        print("Parsed:", amount, category)

        if not category:
            return jsonify({"error": "Missing category"}), 400


        print("Known classes:", label_encoder.classes_)
        encoded_category = label_encoder.transform([category])[0]
        print("Encoded category:", encoded_category)

        input_df = pd.DataFrame([{
            "Expense Amount (USD)": amount,
            "category_encoded": int(encoded_category)
        }])

        print("Prediction input:", input_df)

        prediction = model.predict(input_df)[0]
        print("Predicted emotion:", prediction)

        return jsonify({"emotion": prediction})

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
