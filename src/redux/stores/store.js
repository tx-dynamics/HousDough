import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import onBoadrdingReducer from '../features/onBoadrdingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onBoadrding: onBoadrdingReducer,
  },
});
