import React, { useState, useContext } from "react";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { ShoppingCart as BuyIcon, Sell as SellIcon } from "@mui/icons-material";
import { AppContext } from "../context/AppContext";
import { holdingsData, orderbookData, positionsData } from "../api/mockApi";

const FabButton = () => {
  const [open, setOpen] = useState(false);
  const { activeTab, setShowOrderPad, setOrderType, setSelectedStock } =
    useContext(AppContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   // new changes done
  const getTopStock = () => {
    switch (activeTab) {
      case "holdings":
        return holdingsData[0];
      case "orderbook":
        return orderbookData[0];
      case "positions":
        return positionsData[0];
      default:
        return holdingsData[0];
    }
  };

  const handleActionClick = (type) => {
    const stock = getTopStock();
    setSelectedStock(stock);
    setOrderType(type);
    setShowOrderPad(true);
    handleClose();
  };

  const actions = [
    {
      icon: <BuyIcon color="success" />,
      name: "Buy",
      action: () => handleActionClick("BUY"),
    },
    {
      icon: <SellIcon color="error" />,
      name: "Sell",
      action: () => handleActionClick("SELL"),
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 70,
        right: 16,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="Trade actions"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default FabButton;
