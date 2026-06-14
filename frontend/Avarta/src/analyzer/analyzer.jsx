import React, { useState, useRef } from 'react';
import { Upload, Camera, Search, X, Wrench, MapPin, RotateCcw } from 'lucide-react';
import DIY from './diy';
import Results from './result';
import './analyzer.css';

const Analyzer = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('analyzer'); // 'analyzer', 'diy', 'results'
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // ML API Configuration
  const ML_API_URL = 'http://localhost:5000/predict';

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setError('');
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setCameraError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setShowCamera(true);
    } catch (error) {
      setCameraError('Camera access denied. Please allow camera permissions.');
      console.error('Camera error:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    setSelectedImage(imageData);
    stopCamera();
  };

  const base64ToBlob = (base64) => {
    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uint8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; i++) {
      uint8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: contentType });
  };

  const analyzeWaste = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setError('');
    
    try {
      console.log('Starting waste analysis...');
      
      // Convert base64 to blob
      const blob = base64ToBlob(selectedImage);
      
      // Create FormData
      const formData = new FormData();
      formData.append('image', blob, 'garbage.jpg');
      
      console.log('Sending request to ML API:', ML_API_URL);
      
      // Call ML API
      const response = await fetch(ML_API_URL, {
        method: 'POST',
        body: formData
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log('ML API Result:', result);
      
      if (result.success) {
        const classification = {
          type: result.type,
          confidence: result.confidence,
          recyclable: result.recyclable,
          allPredictions: result.all_predictions,
          image: selectedImage
        };
        
        console.log('Classification successful:', classification);
        setAnalysisResult(classification);
        
      } else {
        throw new Error(result.error || 'Classification failed');
      }
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(
        `Failed to analyze image: ${error.message}. ` +
        `Make sure the ML server is running on ${ML_API_URL}`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOptionSelect = (option) => {
    if (analysisResult) {
      if (option === 'diy') {
        setCurrentView('diy');
      } else if (option === 'recycle') {
        setCurrentView('results');
      } else if (option === 'reupload') {
        removeImage();
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setError('');
    setAnalysisResult(null);
    stopCamera();
  };

  const handleBackToAnalyzer = () => {
    setCurrentView('analyzer');
  };

  const handleSwitchToRecycle = () => {
    setCurrentView('results');
  };

  const handleSwitchToDIY = () => {
    setCurrentView('diy');
  };

  // Render different views
  if (currentView === 'diy' && analysisResult) {
    return (
      <DIY 
        wasteType={analysisResult.type}
        image={analysisResult.image}
        onBack={handleBackToAnalyzer}
        onSwitchToRecycle={handleSwitchToRecycle}
      />
    );
  }

  if (currentView === 'results' && analysisResult) {
    return (
      <Results 
        wasteType={analysisResult.type}
        image={analysisResult.image}
        onBack={handleBackToAnalyzer}
        onSwitchToDIY={handleSwitchToDIY}
      />
    );
  }

  // Main Analyzer View
  return (
    <div className="analyzer-container">
      <div className="analyzer-header">
        <button className="back-btn" onClick={onBack}>
          <X size={24} />
        </button>
        <h2>Analyze Waste</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      {!showCamera ? (
        <>
          <div className="upload-section">
            {!selectedImage ? (
              <div className="upload-options">
                <div className="upload-card" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={48} />
                  <span>Upload Photo</span>
                  <p>Select an image from your gallery</p>
                </div>
                
                <div className="upload-card" onClick={startCamera}>
                  <Camera size={48} />
                  <span>Take Photo</span>
                  <p>Use your camera to capture waste</p>
                </div>
              </div>
            ) : (
              <div className="image-preview-container">
                <div className="image-preview-header">
                  <h3>Selected Image</h3>
                  <button className="remove-btn" onClick={removeImage}>
                    <X size={20} />
                  </button>
                </div>
                <img src={selectedImage} alt="Selected waste" className="preview-image" />
                
                {/* Show analysis result if available */}
                {analysisResult && (
                  <div className="analysis-result">
                    <div className="result-badge">
                      <strong>Identified:</strong> {analysisResult.type}
                    </div>
                    <div className="confidence">
                      <strong>Confidence:</strong> {(analysisResult.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>

          {(cameraError || error) && (
            <div className="error-message">
              {cameraError || error}
            </div>
          )}

          {/* Step Indicators */}
          <div className="step-indicator">
            <div className={`step ${selectedImage ? 'completed' : 'active'}`}>
              1. Upload Image
            </div>
            <div className={`step ${analysisResult ? 'completed' : selectedImage ? 'active' : ''}`}>
              2. Analyze
            </div>
            <div className={`step ${analysisResult ? 'active' : ''}`}>
              3. Choose Action
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-section">
            {!analysisResult ? (
              // Show Analyze button if image is selected but not analyzed
              selectedImage && (
                <button 
                  className={`analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
                  onClick={analyzeWaste}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="spinner"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Analyze Waste
                    </>
                  )}
                </button>
              )
            ) : (
              // Show options after analysis
              <div className="options-section">
                <h3>What would you like to do?</h3>
                <div className="action-options">
                  <button 
                    className="option-btn diy-option"
                    onClick={() => handleOptionSelect('diy')}
                  >
                    <Wrench size={24} />
                    <span>Make Something From It</span>
                    <small>Get creative DIY ideas using Gemini AI</small>
                  </button>
                  
                  <button 
                    className="option-btn recycle-option"
                    onClick={() => handleOptionSelect('recycle')}
                  >
                    <MapPin size={24} />
                    <span>Find Nearest Recycling Plant</span>
                    <small>Locate disposal facilities near you</small>
                  </button>
                  
                  <button 
                    className="option-btn reupload-option"
                    onClick={() => handleOptionSelect('reupload')}
                  >
                    <RotateCcw size={24} />
                    <span>Re-upload Image</span>
                    <small>Try another photo</small>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="camera-container">
          <div className="camera-header">
            <h3>Take Photo</h3>
            <button className="close-camera" onClick={stopCamera}>
              <X size={24} />
            </button>
          </div>
          
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className="camera-view"
          />
          
          {cameraError && (
            <div className="error-message">
              {cameraError}
            </div>
          )}
          
          <div className="camera-controls">
            <button className="capture-btn" onClick={capturePhoto}>
              <Camera size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyzer;