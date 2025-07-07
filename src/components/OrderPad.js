import React, { useState, useContext } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl 
} from '@mui/material';
import { AppContext } from '../context/AppContext';

const OrderPad = () => {
  const { 
    showOrderPad, 
    setShowOrderPad, 
    orderType, 
    selectedStock 
  } = useContext(AppContext);

  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [orderTypeLocal, setOrderTypeLocal] = useState('MARKET');

  const handleClose = () => {
    setShowOrderPad(false);
    setQuantity('');
    setPrice('');
  };

  const handleSubmit = () => {
    // In a real app, this would submit the order to the API
    console.log(`Submitting ${orderType} order for ${selectedStock.symbol}`);
    handleClose();
  };

  return (
    <Dialog open={showOrderPad} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ 
        backgroundColor: orderType === 'BUY' ? 'success.light' : 'error.light',
        color: 'white'
      }}>
        {orderType} {selectedStock?.symbol}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {orderType === 'BUY' ? 'Buy Order' : 'Sell Order'}
          </Typography>
          <Typography variant="body1">
            Symbol: {selectedStock?.symbol}
          </Typography>
        </Box>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Order Type</InputLabel>
          <Select
            value={orderTypeLocal}
            label="Order Type"
            onChange={(e) => setOrderTypeLocal(e.target.value)}
          >
            <MenuItem value="MARKET">Market</MenuItem>
            <MenuItem value="LIMIT">Limit</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{ mb: 3 }}
        />

        {orderTypeLocal === 'LIMIT' && (
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mb: 3 }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          color={orderType === 'BUY' ? 'success' : 'error'}
        >
          {orderType === 'BUY' ? 'Buy' : 'Sell'} {selectedStock?.symbol}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderPad;