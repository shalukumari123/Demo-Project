import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppContext";
import BrokerLogin from "./components/BrokerLogin";
import Holdings from "./components/Holdings";
import Orderbook from "./components/Orderbook";
import Positions from "./components/Positions";
import BottomNav from "./components/BottomNav";
import FabButton from "./components/FabButton";
import OrderPad from "./components/OrderPad";
import { Box } from "@mui/material";

const AppContent = () => {
  const { isLoggedIn, activeTab, error } = useContext(AppContext);

  if (!isLoggedIn) {
    return <BrokerLogin />;
  }

  return (
    <Box sx={{ pb: 7 }}>
      {error && (
        <Box sx={{ p: 2 }}></Box>
      )}

      <Routes>
        <Route path="/app/holdings" element={<Holdings />} />
        <Route path="/app/orderbook" element={<Orderbook />} />
        <Route path="/app/positions" element={<Positions />} />
        <Route path="/app" element={<Navigate to={`/app/${activeTab}`} />} />
      </Routes>

      <FabButton />
      <BottomNav />
      <OrderPad />
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
};

export default App;
