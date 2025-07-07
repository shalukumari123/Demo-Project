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
import { positionsData } from '../api/mockApi';

const Positions = () => {
  const { setSelectedStock, setOrderType, setShowOrderPad } = useContext(AppContext);

  const handleStockClick = (stock, action) => {
    setSelectedStock(stock);
    setOrderType(action);
    setShowOrderPad(true);
  };

  // Calculate total P&L for the card
  const totalPnl = positionsData.reduce((sum, position) => sum + position.pnl, 0);

  return (
    <Box sx={{ p: 2, pb: 8 }}>
      <Typography variant="h5" gutterBottom>
        Positions
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography color="text.secondary">Total P&L</Typography>
          <Typography variant="h5" color={totalPnl >= 0 ? 'success.main' : 'error.main'}>
            ₹{totalPnl.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Buy Price</TableCell>
              <TableCell align="right">LTP</TableCell>
              <TableCell align="right">P&L</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positionsData.map((position) => (
              <TableRow key={position.id}>
                <TableCell>{position.symbol}</TableCell>
                <TableCell align="right">{position.quantity}</TableCell>
                <TableCell align="right">₹{position.buyPrice.toFixed(2)}</TableCell>
                <TableCell align="right">₹{position.ltp.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Chip 
                    label={`₹${position.pnl.toFixed(2)}`} 
                    color={position.pnl >= 0 ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Chip 
                      label="Buy" 
                      color="success" 
                      variant="outlined"
                      onClick={() => handleStockClick(position, 'BUY')}
                      clickable
                    />
                    <Chip 
                      label="Sell" 
                      color="error" 
                      variant="outlined"
                      onClick={() => handleStockClick(position, 'SELL')}
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

export default Positions;