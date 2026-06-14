import React, { useState, useEffect } from 'react';
import { Wrench, AlertCircle, RotateCcw, MapPin } from 'lucide-react';
import './diy.css';

const DIY = ({ wasteType, onBack, onSwitchToRecycle, image }) => {
  const [diyGuide, setDiyGuide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Map ML model output to readable names
  const wasteTypeNames = {
    'battery': 'Battery',
    'biological': 'Biological Waste',
    'brown-glass': 'Brown Glass',
    'cardboard': 'Cardboard',
    'clothes': 'Clothes',
    'green-glass': 'Green Glass',
    'metal': 'Metal',
    'paper': 'Paper',
    'plastic': 'Plastic',
    'shoes': 'Shoes',
    'trash': 'General Trash',
    'white-glass': 'White Glass'
  };

  const displayName = wasteTypeNames[wasteType] || wasteType;

  // IMPORTANT: Replace with your actual Gemini API Key
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  useEffect(() => {
    fetchDIYGuide();
  }, [wasteType]);

  const fetchDIYGuide = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Fetching DIY guide for:', displayName);
      
      const prompt = `Create a practical DIY guide for repurposing ${displayName} at home. Be creative but realistic.

Provide a JSON response with this exact structure:
{
  "possible": true/false,
  "title": "Creative project name",
  "description": "Brief project description",
  "difficulty": "Beginner/Intermediate/Advanced",
  "time": "Estimated time required",
  "materials": ["item1", "item2", "item3"],
  "steps": ["Step 1 instructions", "Step 2 instructions", "Step 3 instructions"],
  "message": "Only if not possible, explain why"
}

If ${displayName} is not suitable for DIY (like batteries, biological waste), set "possible": false and explain in "message".`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Gemini API');
      }
      
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from response
      let jsonText = generatedText;
      const jsonMatch = generatedText.match(/```json\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }
      
      const guide = JSON.parse(jsonText);
      setDiyGuide(guide);
      
    } catch (err) {
      console.error('DIY guide fetch error:', err);
      setError(`Failed to load DIY guide: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="diy-container">
        <div className="diy-header">
          <button className="back-btn" onClick={onBack}>
            <RotateCcw size={24} />
          </button>
          <h2>Creative DIY Ideas</h2>
        </div>
        
        <div className="image-section">
          <img src={image} alt="Analyzed waste" className="analyzed-image" />
          <div className="waste-type-badge">
            Creating ideas for: {displayName}
          </div>
        </div>
        
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Generating creative DIY ideas for your {displayName}...</p>
          <p className="loading-sub">Using Gemini AI to create unique upcycling projects</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="diy-container">
        <div className="diy-header">
          <button className="back-btn" onClick={onBack}>
            <RotateCcw size={24} />
          </button>
          <h2>Creative DIY Ideas</h2>
        </div>
        
        <div className="image-section">
          <img src={image} alt="Analyzed waste" className="analyzed-image" />
          <div className="waste-type-badge">
            Ideas for: {displayName}
          </div>
        </div>
        
        <div className="error-state">
          <AlertCircle size={48} />
          <h3>Error Loading Ideas</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchDIYGuide}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="diy-container">
      <div className="diy-header">
        <button className="back-btn" onClick={onBack}>
          <RotateCcw size={24} />
        </button>
        <h2>Creative DIY Ideas</h2>
      </div>

      <div className="image-section">
        <img src={image} alt="Analyzed waste" className="analyzed-image" />
        <div className="waste-type-badge">
          Project for: {displayName}
        </div>
      </div>

      {diyGuide && diyGuide.possible ? (
        <div className="diy-project">
          <div className="project-header">
            <Wrench size={32} />
            <h3>{diyGuide.title}</h3>
          </div>
          
          <p className="project-description">{diyGuide.description}</p>
          
          <div className="project-details">
            <div className="detail-item">
              <span className="label">Difficulty:</span>
              <span className="value">{diyGuide.difficulty}</span>
            </div>
            <div className="detail-item">
              <span className="label">Time Required:</span>
              <span className="value">{diyGuide.time}</span>
            </div>
          </div>
          
          <div className="materials-section">
            <h4>Materials Needed</h4>
            <div className="materials-list">
              {diyGuide.materials && diyGuide.materials.map((material, index) => (
                <div key={index} className="material-item">
                  {material}
                </div>
              ))}
            </div>
          </div>
          
          <div className="steps-section">
            <h4>Step-by-Step Instructions</h4>
            <div className="steps-list">
              {diyGuide.steps && diyGuide.steps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="alternative-option">
            <p>Prefer to recycle instead?</p>
            <button className="recycle-option-btn" onClick={onSwitchToRecycle}>
              <MapPin size={18} />
              Find Recycling Centers
            </button>
          </div>
        </div>
      ) : (
        <div className="not-possible">
          <AlertCircle size={48} />
          <h3>DIY Not Recommended</h3>
          <p>{diyGuide?.message || `This type of waste (${displayName}) is not suitable for DIY projects for safety or practical reasons.`}</p>
          <button className="recycle-btn" onClick={onSwitchToRecycle}>
            Find Recycling Options Instead
          </button>
        </div>
      )}
    </div>
  );
};

export default DIY;