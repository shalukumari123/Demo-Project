import React, { useContext } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { AppContext } from '../context/AppContext';
import { orderbookData } from '../api/mockApi';

const Orderbook = () => {
  const { setSelectedStock, setOrderType, setShowOrderPad } = useContext(AppContext);

  const handleStockClick = (stock, action) => {
    setSelectedStock(stock);
    setOrderType(action);
    setShowOrderPad(true);
  };

  // Calculate P&L for the card (mock calculation)
  const realizedPnl = orderbookData.reduce((sum, order) => {
    return sum + (order.type === 'SELL' ? (order.price * order.quantity * 0.1) : 0);
  }, 0);

  const unrealizedPnl = orderbookData.reduce((sum, order) => {
    return sum + (order.type === 'BUY' ? (order.price * order.quantity * 0.05) : 0);
  }, 0);

  return (
    <Box sx={{ p: 2, pb: 8 }}>
      <Typography variant="h5" gutterBottom>
        Orderbook
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">Realized P&L</Typography>
            <Typography variant="h5" color="success.main">
              ₹{realizedPnl.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">Unrealized P&L</Typography>
            <Typography variant="h5" color="error.main">
              ₹{unrealizedPnl.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderbookData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.symbol}</TableCell>
                <TableCell align="right">
                  <Chip 
                    label={order.type} 
                    color={order.type === 'BUY' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{order.quantity}</TableCell>
                <TableCell align="right">₹{order.price.toFixed(2)}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right">
                  {new Date(order.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Chip 
                      label="Buy" 
                      color="success" 
                      variant="outlined"
                      onClick={() => handleStockClick(order, 'BUY')}
                      clickable
                    />
                    <Chip 
                      label="Sell" 
                      color="error" 
                      variant="outlined"
                      onClick={() => handleStockClick(order, 'SELL')}
                      clickable
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orderbook;