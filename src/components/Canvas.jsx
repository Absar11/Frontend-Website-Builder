import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  addComponent,
  moveComponent,
  selectComponent,
} from '../features/website/websiteSlice';
import {
  Eye,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react';

const RenderedComponent = ({ component, isSelected }) => {
  const dispatch = useDispatch();
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData('componentId', component.id);
  };
  
  const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggedOver(true);
  };
  
  const handleDragLeave = (e) => {
      e.stopPropagation();
      setIsDraggedOver(false);
  };

  const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggedOver(false);

      const dragId = e.dataTransfer.getData('componentId');
      if (dragId && dragId !== component.id) {
          dispatch(moveComponent({ dragId, dropId: component.id }));
      }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(selectComponent(component.id));
  };

  const baseClasses = "p-4 cursor-pointer transition-all duration-200";
  const selectedClasses = isSelected ? "ring-2 ring-blue-500 ring-offset-2" : "hover:ring-2 hover:ring-blue-200";
  const dropIndicatorClasses = isDraggedOver ? "drop-indicator show-indicator" : "drop-indicator";
  
  const props = component.props;

  let element;
  switch (component.type) {
    case 'Heading':
      element = <h1 className="text-4xl font-bold">{props.text}</h1>;
      break;
    case 'Paragraph':
      element = <p>{props.text}</p>;
      break;
    case 'Button':
      element = (
        <button style={{ backgroundColor: props.backgroundColor, color: props.textColor }} className="px-6 py-2 rounded-md font-semibold">
          {props.text}
        </button>
      );
      break;
    case 'Image':
      element = <img src={props.src || 'https://placehold.co/600x400/e2e8f0/cbd5e0?text=Your+Image'} alt="User content" className="max-w-full h-auto rounded-md" />;
      break;
    default:
      return null;
  }
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`${baseClasses} ${selectedClasses} ${dropIndicatorClasses}`}
    >
      {element}
    </div>
  );
};


const Canvas = () => {
    const dispatch = useDispatch();
    const { components, selectedComponentId } = useSelector((state) => state.website);
    const [view, setView] = useState('desktop'); // State for device view

    // Define widths for each view
    const viewWidths = {
      desktop: 'max-w-4xl',
      tablet: 'max-w-2xl',
      mobile: 'max-w-sm',
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('componentType');
        if (type) {
            let newComponent;
            switch (type) {
                case 'Heading':
                    newComponent = { id: uuidv4(), type, props: { text: 'New Heading' } };
                    break;
                case 'Paragraph':
                    newComponent = { id: uuidv4(), type, props: { text: 'New paragraph of text.' } };
                    break;
                case 'Button':
                    newComponent = { id: uuidv4(), type, props: { text: 'Click Me', backgroundColor: '#3b82f6', textColor: '#ffffff' } };
                    break;
                case 'Image':
                    newComponent = { id: uuidv4(), type, props: { src: '' } };
                    break;
                default:
                    return;
            }
            dispatch(addComponent({ component: newComponent, index: components.length }));
        }
    };

    const handleCanvasClick = () => {
        dispatch(selectComponent(null));
    }

    return (
        <main className="flex-1 flex flex-col">
            <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between z-10 shadow-sm">
                <div className="flex items-center space-x-2 text-gray-500">
                    <button onClick={() => setView('desktop')} className={`p-2 rounded-md ${view === 'desktop' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}><Laptop size={20}/></button>
                    <button onClick={() => setView('tablet')} className={`p-2 rounded-md ${view === 'tablet' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}><Tablet size={20}/></button>
                    <button onClick={() => setView('mobile')} className={`p-2 rounded-md ${view === 'mobile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}><Smartphone size={20}/></button>
                </div>
                 <h1 className="text-lg font-semibold text-gray-700">Website Builder</h1>
                <div className="flex items-center space-x-4">
                     <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
                        <Eye size={18} />
                        <span>Preview</span>
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Publish
                    </button>
                </div>
            </header>
            
            <div className="flex-1 p-8 overflow-y-auto bg-gray-100" onClick={handleCanvasClick}>
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`mx-auto bg-white rounded-lg shadow-xl min-h-full p-4 space-y-2 transition-all duration-300 ${viewWidths[view]}`}
                >
                    {components.map((component) => (
                        <RenderedComponent
                            key={component.id}
                            component={component}
                            isSelected={component.id === selectedComponentId}
                        />
                    ))}
                    {components.length === 0 && (
                        <div className="text-center text-gray-400 py-24 border-2 border-dashed border-gray-300 rounded-lg">
                            <p>Drag components from the left panel and drop them here.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Canvas;

