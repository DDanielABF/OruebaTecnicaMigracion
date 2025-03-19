// src/App.tsx
import React from 'react';
import AppRoutes from './routes/AppRoutes';
//import './styles/global.scss';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
};

export default App;
