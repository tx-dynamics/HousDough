import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import paymentReducer from '../features/paymentSlice';

export const store = configureStore({
  reducer: {
    userProfile: userReducer,
    userPayment: paymentReducer,
  },
});
