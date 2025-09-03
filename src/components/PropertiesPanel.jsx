import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentProps, deleteComponent } from '../features/website/websiteSlice';
import { MousePointerClick, Trash2 } from 'lucide-react';

const PropertiesPanel = () => {
  const dispatch = useDispatch();
  const { components, selectedComponentId } = useSelector((state) => state.website);
  const selectedComponent = components.find((c) => c.id === selectedComponentId);

  if (!selectedComponent) {
    return (
      <aside className="w-80 bg-white p-6 border-l border-gray-200">
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <MousePointerClick size={48} className="mb-4" />
          <h3 className="font-bold text-lg">Select an Element</h3>
          <p className="text-sm">Click on an element in the canvas to edit its properties here.</p>
        </div>
      </aside>
    );
  }

  const handlePropChange = (propName, value) => {
    dispatch(updateComponentProps({ id: selectedComponent.id, props: { [propName]: value } }));
  };
  
  const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this component?')) {
          dispatch(deleteComponent(selectedComponent.id));
      }
  };


  const renderProperties = () => {
    switch (selectedComponent.type) {
      case 'Heading':
      case 'Paragraph':
        return (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
            <textarea
              value={selectedComponent.props.text}
              onChange={(e) => handlePropChange('text', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            />
          </>
        );
      case 'Button':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                value={selectedComponent.props.text}
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
              <input
                type="color"
                value={selectedComponent.props.backgroundColor || '#3b82f6'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="w-full h-10 p-1 border border-gray-300 rounded-md"
              />
            </div>
             <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
              <input
                type="color"
                value={selectedComponent.props.textColor || '#ffffff'}
                onChange={(e) => handlePropChange('textColor', e.target.value)}
                className="w-full h-10 p-1 border border-gray-300 rounded-md"
              />
            </div>
          </>
        );
      case 'Image':
        return (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={selectedComponent.props.src || ''}
              onChange={(e) => handlePropChange('src', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="https://placehold.co/600x400"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-80 bg-white p-6 border-l border-gray-200 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{selectedComponent.type}</h3>
        <button 
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
            title="Delete Component"
        >
            <Trash2 size={18} />
        </button>
      </div>
      <div className="space-y-4">{renderProperties()}</div>
    </aside>
  );
};

export default PropertiesPanel;

