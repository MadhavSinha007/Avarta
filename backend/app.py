import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Reduce TF warnings

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import base64
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

app = Flask(__name__)
CORS(app)

# Configuration
MODEL_PATH = 'models/model.h5'
CLASS_NAMES_PATH = 'models/class_names.npy'
IMG_SIZE = 224

def load_model_safe(path):
    """Load model with compatibility handling"""
    try:
        # Try standard load
        print("  Attempting standard load...")
        return load_model(path)
    except Exception as e:
        print(f"  Standard load failed: {str(e)[:100]}")
        try:
            # Try without compile
            print("  Attempting load without compile...")
            model = load_model(path, compile=False)
            model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
            return model
        except Exception as e2:
            print(f"  Load without compile failed: {str(e2)[:100]}")
            try:
                # Try with safe_mode=False (TF 2.15+)
                print("  Attempting load with safe_mode=False...")
                return load_model(path, safe_mode=False)
            except:
                # Final attempt with custom object scope
                print("  Attempting load with custom object scope...")
                with tf.keras.utils.custom_object_scope({}):
                    return load_model(path, compile=False)

# Load model and class names at startup
print("Loading model...")
model = load_model_safe(MODEL_PATH)
class_names = np.load(CLASS_NAMES_PATH, allow_pickle=True)
print(f"Model loaded successfully! Classes: {class_names}")

def preprocess_image(image_file):
    """Preprocess image for model prediction"""
    try:
        img = Image.open(image_file).convert('RGB')
        img = img.resize((IMG_SIZE, IMG_SIZE))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")

def get_recyclable_status(garbage_type):
    """Determine if the waste type is recyclable"""
    recyclable_types = ['paper', 'cardboard', 'metal', 'plastic', 
                       'white-glass', 'green-glass', 'brown-glass']
    return garbage_type.lower() in recyclable_types

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'classes': class_names.tolist()
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Main prediction endpoint"""
    try:
        # Check if image is in request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        
        if image_file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400
        
        # Preprocess image
        img_array = preprocess_image(image_file)
        
        # Make prediction
        predictions = model.predict(img_array, verbose=0)
        predicted_idx = np.argmax(predictions[0])
        predicted_class = class_names[predicted_idx]
        confidence = float(predictions[0][predicted_idx])
        
        # Get all predictions with confidence scores
        all_predictions = []
        for i, cls in enumerate(class_names):
            all_predictions.append({
                'type': cls,
                'confidence': float(predictions[0][i])
            })
        
        # Sort by confidence
        all_predictions.sort(key=lambda x: x['confidence'], reverse=True)
        
        # Determine recyclability
        is_recyclable = get_recyclable_status(predicted_class)
        
        # Return response
        response = {
            'success': True,
            'type': predicted_class,
            'confidence': confidence,
            'recyclable': is_recyclable,
            'all_predictions': all_predictions[:5]  # Top 5 predictions
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/predict/base64', methods=['POST'])
def predict_base64():
    """Alternative endpoint for base64 encoded images"""
    try:
        data = request.get_json()
        
        if 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image']
        if 'base64,' in image_data:
            image_data = image_data.split('base64,')[1]
        
        image_bytes = base64.b64decode(image_data)
        image_file = io.BytesIO(image_bytes)
        
        # Preprocess and predict
        img_array = preprocess_image(image_file)
        predictions = model.predict(img_array, verbose=0)
        predicted_idx = np.argmax(predictions[0])
        predicted_class = class_names[predicted_idx]
        confidence = float(predictions[0][predicted_idx])
        
        # Get all predictions
        all_predictions = []
        for i, cls in enumerate(class_names):
            all_predictions.append({
                'type': cls,
                'confidence': float(predictions[0][i])
            })
        all_predictions.sort(key=lambda x: x['confidence'], reverse=True)
        
        is_recyclable = get_recyclable_status(predicted_class)
        
        response = {
            'success': True,
            'type': predicted_class,
            'confidence': confidence,
            'recyclable': is_recyclable,
            'all_predictions': all_predictions[:5]
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    # Make sure models directory exists
    if not os.path.exists(MODEL_PATH):
        print(f"ERROR: Model not found at {MODEL_PATH}")
        print("Please ensure your model is in the correct location")
        exit(1)
    
    # Run server
    print("\n" + "="*60)
    print("🚀 ML Server Starting...")
    print("="*60)
    print(f"Available classes: {', '.join(class_names)}")
    print("\nEndpoints:")
    print("  POST /predict        - Upload image file")
    print("  POST /predict/base64 - Send base64 image")
    print("  GET  /health         - Health check")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)