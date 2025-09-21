import React from 'react';
import Router from './Router';
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <AuthProvider>
      <Router></Router>
    </AuthProvider>
  );
}

export default App;


