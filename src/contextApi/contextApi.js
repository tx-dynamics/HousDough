import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [onBoardingDone, setOnBoardingDone] = useState(null);
  const [paymentDone, setPaymentDone] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userType,
        setUserType,
        onBoardingDone,
        setOnBoardingDone,
        paymentDone,
        setPaymentDone,
      }}>
      {children}
    </UserContext.Provider>
  );
};
