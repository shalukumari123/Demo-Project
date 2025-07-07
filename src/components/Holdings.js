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
  Chip
} from '@mui/material';
import { AppContext } from '../context/AppContext';
import { holdingsData } from '../api/mockApi';

const Holdings = () => {
  const { setSelectedStock, setOrderType, setShowOrderPad } = useContext(AppContext);

  const handleStockClick = (stock, action) => {
    setSelectedStock(stock);
    setOrderType(action);
    setShowOrderPad(true);
  };

  return (
    <Box sx={{ p: 2, pb: 8 }}>
      <Typography variant="h5" gutterBottom>
        Your Holdings
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Avg Price</TableCell>
              <TableCell align="right">LTP</TableCell>
              <TableCell align="right">P&L</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdingsData.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell align="right">{stock.quantity}</TableCell>
                <TableCell align="right">₹{stock.avgPrice.toFixed(2)}</TableCell>
                <TableCell align="right">₹{stock.ltp.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Chip 
                    label={`₹${stock.pnl.toFixed(2)}`} 
                    color={stock.pnl >= 0 ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Chip 
                      label="Buy" 
                      color="success" 
                      variant="outlined"
                      onClick={() => handleStockClick(stock, 'BUY')}
                      clickable
                    />
                    <Chip 
                      label="Sell" 
                      color="error" 
                      variant="outlined"
                      onClick={() => handleStockClick(stock, 'SELL')}
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

export default Holdings;