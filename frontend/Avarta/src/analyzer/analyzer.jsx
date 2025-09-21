import React, { useState } from 'react';
import './analyzer.css';

const Analyzer = ({ onAnalysisComplete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const analyzeWaste = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // TODO: Replace with actual ML model endpoint integration
    // For now, we'll simulate analysis with a timeout
    setTimeout(() => {
      const mockResult = {
        material: 'plastic',
        confidence: 0.87,
        recyclable: true
      };
      setIsAnalyzing(false);
      onAnalysisComplete(mockResult);
    }, 2000);
  };

  return (
    <div className="analyzer-container">
      <h2>Waste Analyzer</h2>
      <p>Upload an image of your waste to identify it and find recycling options</p>
      
      <div className="upload-section">
        <label htmlFor="image-upload" className="upload-label">
          Choose Image
        </label>
        <input 
          id="image-upload"
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="file-input"
        />
        
        {selectedImage && (
          <div className="image-preview">
            <img src={selectedImage} alt="Selected waste" />
          </div>
        )}
      </div>
      
      <div className="action-buttons">
        <button 
          onClick={analyzeWaste} 
          disabled={!selectedImage || isAnalyzing}
          className="analyze-btn"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Waste'}
        </button>
      </div>
    </div>
  );
};

export default Analyzer;