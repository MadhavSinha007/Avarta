import React, { useState } from 'react';
import Analyzer from '../analyzer/analyzer';
import DIY from '../analyzer/diy';
import Results from '../analyzer/result';
import './product.css';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Waste Analyzer</h1>
      </header>
      <main>
        <Analyzer onAnalysisComplete={handleAnalysisComplete} />
        {analysisResult && (
          <>
            <DIY wasteType={analysisResult.material} />
            <Results wasteType={analysisResult.material} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;