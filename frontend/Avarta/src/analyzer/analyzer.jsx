import React, { useState, useRef } from 'react';
import { Upload, Camera, Search, X } from 'lucide-react';
import './analyzer.css';

const Analyzer = ({ onAnalysisComplete, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const garbageTypes = [
    'plastic', 'metal', 'paper', 'cardboard', 
    'biological waste', 'kitchen waste', 'glass', 'electronic'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
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

  const analyzeWaste = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      // TODO: Replace with actual ML model endpoint
      // Convert base64 to blob for API call
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      // ML API Integration Point
      const formData = new FormData();
      formData.append('image', blob, 'garbage.jpg');
      
      /*
      // Uncomment and add your ML endpoint
      const mlResult = await fetch('YOUR_ML_API_ENDPOINT', {
        method: 'POST',
        body: formData
      });
      
      const classification = await mlResult.json();
      */
      
      // Mock response
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockClassification = {
        type: garbageTypes[Math.floor(Math.random() * garbageTypes.length)],
        confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
        recyclable: Math.random() > 0.3
      };
      
      onAnalysisComplete(mockClassification);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    stopCamera();
  };

  return (
    <div className="analyzer-container">
      <div className="analyzer-header">
        <button className="back-btn" onClick={onBack}>
          <X size={24} />
        </button>
        <h2>Analyze Waste</h2>
        <div style={{ width: '40px' }}></div> {/* Spacer for alignment */}
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

          {cameraError && (
            <div className="error-message">
              {cameraError}
            </div>
          )}

          <div className="action-section">
            <button 
              className={`analyze-btn ${!selectedImage ? 'disabled' : ''}`}
              onClick={analyzeWaste}
              disabled={!selectedImage || isAnalyzing}
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