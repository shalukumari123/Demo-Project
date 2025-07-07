import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BookIcon from "@mui/icons-material/Book";
import AssignmentIcon from "@mui/icons-material/Assignment";

const BottomNav = () => {
  const { activeTab, setActiveTab } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(`/app/${newValue}`);
  };

  return (
    <BottomNavigation
      value={activeTab}
      onChange={handleChange}
      showLabels
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <BottomNavigationAction
        label="Holdings"
        value="holdings"
        icon={<AccountBalanceIcon />}
      />
      <BottomNavigationAction
        label="Orderbook"
        value="orderbook"
        icon={<BookIcon />}
      />
      <BottomNavigationAction
        label="Positions"
        value="positions"
        icon={<AssignmentIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
