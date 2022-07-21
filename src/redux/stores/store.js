import {configureStore} from '@reduxjs/toolkit';
import onBoadrdingReducer from '../features/onBoadrdingSlice';
import userReducer from '../features/userSlice';
import paymentReducer from '../features/paymentSlice';

export const store = configureStore({
  reducer: {
    onBoadrding: onBoadrdingReducer,
    userProfile: userReducer,
    userPayment: paymentReducer,
  },
});
