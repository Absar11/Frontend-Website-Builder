import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  components: [
      { id: uuidv4(), type: 'Heading', props: { text: 'Welcome to Your Website' } },
      { id: uuidv4(), type: 'Paragraph', props: { text: 'This is a paragraph. Click on an element to edit its properties on the right. You can also drag and drop to reorder!' } },
      { id: uuidv4(), type: 'Button', props: { text: 'Learn More', backgroundColor: '#3b82f6', textColor: '#ffffff' } },
  ],
  selectedComponentId: null,
};

export const websiteSlice = createSlice({
  name: 'website',
  initialState,
  reducers: {
    addComponent: (state, action) => {
      state.components.splice(action.payload.index, 0, action.payload.component);
    },
    moveComponent: (state, action) => {
        const { dragId, dropId } = action.payload;
        const dragIndex = state.components.findIndex(c => c.id === dragId);
        let dropIndex = state.components.findIndex(c => c.id === dropId);

        // If dropping on the same item, do nothing
        if (dragIndex === dropIndex) return;

        // Remove the dragged item
        const [draggedItem] = state.components.splice(dragIndex, 1);
        
        // Adjust drop index if necessary after removal
        if (dragIndex < dropIndex) {
            dropIndex--;
        }
        
        // Insert it at the new position
        state.components.splice(dropIndex, 0, draggedItem);
    },
    updateComponentProps: (state, action) => {
      const { id, props } = action.payload;
      const component = state.components.find((c) => c.id === id);
      if (component) {
        component.props = { ...component.props, ...props };
      }
    },
    selectComponent: (state, action) => {
      state.selectedComponentId = action.payload;
    },
    deleteComponent: (state, action) => {
        state.components = state.components.filter(c => c.id !== action.payload);
        if (state.selectedComponentId === action.payload) {
            state.selectedComponentId = null;
        }
    },
  },
});

export const { 
    addComponent, 
    moveComponent, 
    updateComponentProps, 
    selectComponent,
    deleteComponent
} = websiteSlice.actions;

export default websiteSlice.reducer;
