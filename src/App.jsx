import React from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';

function App() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
