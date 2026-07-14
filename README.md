# Avarta - Smart Waste Management Assistant

Avarta is a full stack web application that helps you classify waste items and provides actionable recommendations. It uses deep learning to identify garbage types and then suggests DIY projects or finds nearby recycling plants using Gemini API and OpenStreetMap.

## 🚀 Live Demo

Coming Soon

## ✨ Features

- **Image Classification** - Upload a photo of any waste item. The model identifies it from 12 categories including metal, glass, plastic, paper, cardboard, and trash.
- **DIY Recommendations** - Get creative ideas to reuse your waste items. Turn a glass bottle into a planter or a metal can into a pen holder.
- **Recycling Plant Locator** - Find the nearest recycling facility for your specific waste type using location services.
- **User Authentication** - Secure login and signup powered by Firebase Auth.
- **Confidence Scores** - See how confident the model is about each prediction with top 5 results.

## 🧠 How It Works

1. User uploads an image of a waste item
2. The deep learning model (MobileNetV2) classifies the item
3. Gemini API generates DIY ideas based on the waste type
4. OpenStreetMap shows nearby recycling plants
5. User gets a complete recommendation in seconds

## 🏗️ Tech Stack

### Frontend
- React with Vite
- Firebase Authentication

### Backend
- Python Flask
- TensorFlow / Keras
- MobileNetV2 (Transfer Learning)

### APIs
- Gemini API for DIY suggestions
- OpenStreetMap / Nominatim for location services

### Model Source
The classification model is trained separately. You can find it here:

[Garbage Classification Model](https://github.com/MadhavSinha007/Garbage-Classification-Model)

## 📁 Project Structure

```text
Avarta/
├── backend/
│   ├── app.py
│   ├── models/
│   │   ├── model.h5
│   │   └── class_names.npy
│   ├── requirements.txt
│   └── venv/
├── frontend/Avarta
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## 🔧 Installation

### Prerequisites
- Python 3.8 or higher
- Node.js and npm
- Firebase account
- Gemini API key

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:5173`

## 🌍 Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🗺️ Location & DIY Features

After classification, Avarta uses:

- **Gemini API** - Generates step-by-step DIY tutorials based on the waste type.
- **OpenStreetMap Nominatim** - Finds recycling centers near your location.

## 📊 Model Performance

- Architecture: MobileNetV2 with transfer learning
- Input size: 224x224 pixels
- Accuracy: 90%+ on validation data
- Classes: 12 waste categories

## 🔄 Workflow Diagram

```text
User Upload → Image Preprocessing → Model Prediction → Gemini API → DIY Ideas
                                                         ↓
                                              OpenStreetMap → Nearby Plants
                                                         ↓
                                              Display Results to User
```

## 🛠️ Known Issues & Future Improvements

- API call optimization for faster responses
- Personalized DIY suggestions based on user skill level
- Mobile app version with camera integration
- Offline mode for basic classification

## 👨‍💻 Author

**Madhav Sinha** - GitHub: @MadhavSinha007
**Clarence Thomas** - GitHub: @CJ6989
 


## 🙏 Acknowledgments

- Amazon ML Summer School for inspiration
- TensorFlow and Keras community
- Google Gemini API team
- OpenStreetMap contributors
