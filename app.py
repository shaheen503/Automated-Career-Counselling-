from __future__ import annotations

import os
import pickle
from pathlib import Path

import pandas as pd
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
BASE_DIR = Path(__file__).resolve().parent

# Keep the legacy application available, but expose load failures clearly.
model = None
label_encoders = None
career_classes = {}

try:
    with (BASE_DIR / "model.pkl").open("rb") as model_file:
        model = pickle.load(model_file)
except Exception as exc:
    app.logger.exception("Could not load model.pkl: %s", exc)

try:
    with (BASE_DIR / "label_encoders.pkl").open("rb") as encoder_file:
        label_encoders = pickle.load(encoder_file)
    career_encoder = label_encoders.get("Career")
    if career_encoder is not None:
        career_classes = dict(
            zip(career_encoder.transform(career_encoder.classes_), career_encoder.classes_)
        )
except Exception as exc:
    app.logger.exception("Could not load label_encoders.pkl: %s", exc)


@app.get("/api/health")
def api_health():
    """Readiness information for the React client and deployment checks.

    Model artifacts loading successfully does not establish model quality.
    Prediction endpoints remain subject to the feature/encoding audit.
    """
    artifacts_loaded = model is not None and label_encoders is not None
    return jsonify(
        {
            "application": "CareerCompass AI",
            "version": "2.0.0",
            "status": "ready" if artifacts_loaded else "degraded",
            "model_artifacts_loaded": artifacts_loaded,
            "prediction_validation": "pending",
            "message": (
                "Model files loaded. Predictions are not yet certified; "
                "feature order and category encodings still require validation."
                if artifacts_loaded
                else "Model artifacts could not be loaded. Check model.pkl and label_encoders.pkl."
            ),
        }
    ), (200 if artifacts_loaded else 503)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None or not career_classes:
            return jsonify({"error": "The prediction model is not available. Check the model artifacts."}), 503

        data = request.form
        encoded_data = {
            "GPA": float(data.get("GPA")),
            "Internships": int(data.get("Internships")),
            "Projects": int(data.get("Projects")),
            "Coding_Skills": int(data.get("Coding_Skills")),
            "Communication_Skills": int(data.get("Communication_Skills")),
            "Leadership_Experience": int(data.get("Leadership_Experience")),
            "Extracurricular_Activities": int(data.get("Extracurricular_Activities")),
            "Preferred_Work_Environment": int(data.get("Preferred_Work_Environment")),
        }

        if not 0 <= encoded_data["GPA"] <= 10:
            return jsonify({"error": "GPA must be between 0 and 10."}), 400
        for field in ("Internships", "Projects", "Extracurricular_Activities"):
            if encoded_data[field] < 0:
                return jsonify({"error": f"{field} cannot be negative."}), 400

        features = pd.DataFrame([encoded_data])
        prediction = model.predict(features)[0]
        career = career_classes.get(prediction, "Unknown Career")
        return render_template("predict.html", career=career)

    except (TypeError, ValueError) as exc:
        return jsonify({"error": f"Please check the submitted values: {exc}"}), 400
    except Exception:
        app.logger.exception("Career prediction failed")
        return jsonify({"error": "Prediction failed. Please try again after checking the model configuration."}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
