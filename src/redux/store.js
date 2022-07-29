import { configureStore } from '@reduxjs/toolkit'
import numberReducers from './numberSlice';

export const store = configureStore({
  reducer: {
    number: numberReducers,
  },
})