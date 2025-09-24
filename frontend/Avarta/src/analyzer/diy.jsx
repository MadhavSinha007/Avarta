import React, { useState, useEffect } from 'react';
import { Wrench, AlertCircle, RotateCcw } from 'lucide-react';
import './diy.css';

const DIY = ({ wasteType, onBack, onSwitchToRecycle }) => {
  const [diyGuide, setDiyGuide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDIYGuide();
  }, [wasteType]);

  const fetchDIYGuide = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Replace with Google Gemini API
      /*
      const geminiResponse = await fetch('YOUR_GEMINI_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wasteType: wasteType,
          prompt: `Create a step-by-step DIY guide for repurposing ${wasteType} at home. 
                   If not feasible, explain why and suggest recycling.`
        })
      });
      
      const guide = await geminiResponse.json();
      */
      
      // Mock Gemini API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockGuides = {
        plastic: {
          possible: true,
          title: "Plastic Bottle Vertical Garden",
          description: "Transform plastic bottles into a space-saving vertical garden",
          difficulty: "Beginner",
          time: "45 minutes",
          materials: [
            "2L plastic bottles",
            "Scissors",
            "Rope or wire",
            "Potting soil",
            "Seeds or small plants"
          ],
          steps: [
            "Clean and remove labels from plastic bottles",
            "Cut bottles horizontally, leaving one side attached as a hinge",
            "Make drainage holes in the bottom",
            "Fill with potting soil and plant your seeds",
            "Attach bottles to a wall or fence using rope",
            "Water carefully and watch your garden grow"
          ]
        },
        paper: {
          possible: true,
          title: "Homemade Recycled Paper",
          description: "Create new paper from paper waste",
          difficulty: "Intermediate",
          time: "2 hours + drying",
          materials: [
            "Shredded paper",
            "Water",
            "Blender",
            "Screen frame",
            "Sponges",
            "Cloth"
          ],
          steps: [
            "Soak shredded paper in water for 2 hours",
            "Blend into a smooth pulp consistency",
            "Spread pulp evenly on screen frame",
            "Press out excess water with sponges",
            "Transfer to cloth and let dry for 24-48 hours",
            "Carefully peel off your new paper"
          ]
        },
        metal: {
          possible: true,
          title: "Tin Can Herb Planters",
          description: "Upcycle tin cans into charming herb planters",
          difficulty: "Beginner",
          time: "30 minutes",
          materials: [
            "Clean tin cans",
            "Hammer and nail",
            "Paint",
            "Potting soil",
            "Herb plants"
          ],
          steps: [
            "Remove labels and clean cans thoroughly",
            "Make drainage holes in bottom with hammer/nail",
            "Paint cans in desired colors and patterns",
            "Let paint dry completely",
            "Fill with potting soil and plant herbs",
            "Place in sunny spot and water regularly"
          ]
        },
        biological_waste: {
          possible: false,
          message: "DIY projects aren't suitable for biological waste due to hygiene and decomposition concerns. Consider composting instead to create nutrient-rich soil for your garden."
        },
        kitchen_waste: {
          possible: false,
          message: "Kitchen waste is best repurposed through composting. You can create a simple compost bin to turn food scraps into valuable fertilizer for plants."
        }
      };
      
      const guide = mockGuides[wasteType] || {
        possible: false,
        message: "This type of waste is not suitable for DIY projects at home. Please consider recycling it properly."
      };
      
      setDiyGuide(guide);
    } catch (err) {
      setError('Failed to load DIY guide. Please try again.');
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
          <h2>DIY Guide</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Generating DIY ideas for {wasteType}...</p>
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
          <h2>DIY Guide</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        
        <div className="error-state">
          <AlertCircle size={48} />
          <h3>Error Loading Guide</h3>
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
        <h2>DIY Guide</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="waste-type-badge">
        For: {wasteType.replace('_', ' ')}
      </div>

      {diyGuide.possible ? (
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
              {diyGuide.materials.map((material, index) => (
                <div key={index} className="material-item">
                  {material}
                </div>
              ))}
            </div>
          </div>
          
          <div className="steps-section">
            <h4>Step-by-Step Instructions</h4>
            <div className="steps-list">
              {diyGuide.steps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="not-possible">
          <AlertCircle size={48} />
          <h3>DIY Not Recommended</h3>
          <p>{diyGuide.message}</p>
          <button className="recycle-btn" onClick={onSwitchToRecycle}>
            Find Recycling Options
          </button>
        </div>
      )}
    </div>
  );
};

export default DIY;