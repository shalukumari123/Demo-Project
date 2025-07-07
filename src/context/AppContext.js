import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentBroker, setCurrentBroker] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("holdings");
  const [showOrderPad, setShowOrderPad] = useState(false);
  const [orderType, setOrderType] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [error, setError] = useState(null);

  return (
    <AppContext.Provider
      value={{
        currentBroker,
        setCurrentBroker,
        isLoggedIn,
        setIsLoggedIn,
        activeTab,
        setActiveTab,
        showOrderPad,
        setShowOrderPad,
        orderType,
        setOrderType,
        selectedStock,
        setSelectedStock,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
