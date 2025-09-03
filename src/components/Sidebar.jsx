import React from 'react';
import {
  Heading1,
  Type,
  RectangleHorizontal,
  Image as ImageIcon,
} from 'lucide-react';

const COMPONENT_LIST = [
  { type: 'Heading', icon: <Heading1 size={24} />, label: 'Heading' },
  { type: 'Paragraph', icon: <Type size={24} />, label: 'Paragraph' },
  { type: 'Button', icon: <RectangleHorizontal size={24} />, label: 'Button' },
  { type: 'Image', icon: <ImageIcon size={24} />, label: 'Image' },
];

const DraggableItem = ({ type, icon, label }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('componentType', type);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center p-3 mb-2 bg-white rounded-lg shadow-sm cursor-grab hover:bg-blue-50 hover:shadow-md transition-all duration-200"
    >
      <div className="text-gray-500 mr-4">{icon}</div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-72 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Components</h2>
      <div>
        {COMPONENT_LIST.map((item) => (
          <DraggableItem key={item.type} {...item} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
