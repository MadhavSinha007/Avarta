import React, { useState, useEffect } from 'react';
import './diy.css';

const DIY = ({ wasteType }) => {
  const [diyIdeas, setDiyIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wasteType) {
      fetchDIYIdeas(wasteType);
    }
  }, [wasteType]);

  const fetchDIYIdeas = async (material) => {
    setIsLoading(true);
    
    // TODO: Replace with actual Google Gemini API integration
    // For now, we'll use mock data based on material type
    setTimeout(() => {
      let ideas = [];
      
      switch(material) {
        case 'plastic':
          ideas = [
            {
              title: "Plastic Bottle Planters",
              steps: [
                "Cut the top off a plastic bottle",
                "Make drainage holes in the bottom",
                "Paint or decorate the bottle as desired",
                "Fill with soil and plant your seeds or seedlings"
              ],
              difficulty: "Easy"
            },
            {
              title: "Plastic Bottle Bird Feeder",
              steps: [
                "Cut openings in the sides of a clean plastic bottle",
                "Insert wooden spoons through the openings as perches",
                "Fill with birdseed",
                "Hang from a tree branch"
              ],
              difficulty: "Easy"
            }
          ];
          break;
        case 'paper':
          ideas = [
            {
              title: "DIY Recycled Paper",
              steps: [
                "Shred used paper into small pieces",
                "Soak in water for several hours",
                "Blend into a pulp",
                "Press onto a screen to form sheets",
                "Allow to dry completely"
              ],
              difficulty: "Medium"
            }
          ];
          break;
        case 'metal':
          ideas = [
            {
              title: "Tin Can Herb Planters",
              steps: [
                "Clean and remove labels from tin cans",
                "Make drainage holes in the bottom",
                "Paint or decorate the cans",
                "Fill with soil and plant herbs"
              ],
              difficulty: "Easy"
            }
          ];
          break;
        default:
          ideas = [
            {
              title: "Recycle It",
              steps: ["This item is best recycled through proper channels"],
              difficulty: "N/A"
            }
          ];
      }
      
      setDiyIdeas(ideas);
      setIsLoading(false);
    }, 1500);
  };

  if (!wasteType) {
    return (
      <div className="diy-container">
        <h3>DIY Ideas</h3>
        <p>Analyze an item first to get DIY ideas</p>
      </div>
    );
  }

  return (
    <div className="diy-container">
      <h3>DIY Ideas for {wasteType}</h3>
      
      {isLoading ? (
        <div className="loading">Loading ideas...</div>
      ) : (
        <div className="ideas-list">
          {diyIdeas.map((idea, index) => (
            <div key={index} className="idea-card">
              <h4>{idea.title}</h4>
              <span className="difficulty">Difficulty: {idea.difficulty}</span>
              <ol>
                {idea.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DIY;