import { configureStore } from '@reduxjs/toolkit';
import websiteReducer from '../features/website/websiteSlice';

export const store = configureStore({
  reducer: {
    website: websiteReducer,
  },
});
