import zerodhaLogo from '../assets/zerodha.png';
import upstoxLogo from '../assets/upstox.png';
import growwLogo from '../assets/Groww.jpg';
import angleOneLogo from '../assets/angleOne.png';
export const brokers = [
  { id: 1, name: 'Zerodha', logo: zerodhaLogo },
  { id: 2, name: 'Upstox', logo: upstoxLogo },
  { id: 3, name: 'Groww', logo: growwLogo },
  { id: 4, name: 'Angel One', logo: angleOneLogo },
];

export const holdingsData = [
  { id: 1, symbol: 'RELIANCE', quantity: 10, avgPrice: 2450, ltp: 2580, pnl: 1300 },
  { id: 2, symbol: 'TCS', quantity: 5, avgPrice: 3200, ltp: 3350, pnl: 750 },
  { id: 3, symbol: 'HDFCBANK', quantity: 8, avgPrice: 1450, ltp: 1520, pnl: 560 },
  { id: 4, symbol: 'INFY', quantity: 15, avgPrice: 1500, ltp: 1420, pnl: -1200 },
];

export const orderbookData = [
  { id: 1, symbol: 'RELIANCE', type: 'BUY', quantity: 10, price: 2450, status: 'COMPLETED', timestamp: '2023-05-15T10:30:00' },
  { id: 2, symbol: 'TCS', type: 'SELL', quantity: 5, price: 3300, status: 'COMPLETED', timestamp: '2023-05-14T11:45:00' },
  { id: 3, symbol: 'HDFCBANK', type: 'BUY', quantity: 8, price: 1450, status: 'COMPLETED', timestamp: '2023-05-12T09:15:00' },
  { id: 4, symbol: 'INFY', type: 'SELL', quantity: 15, price: 1420, status: 'COMPLETED', timestamp: '2023-05-10T14:20:00' },
];

export const positionsData = [
  { id: 1, symbol: 'RELIANCE', quantity: 10, buyPrice: 2450, ltp: 2580, pnl: 1300 },
  { id: 2, symbol: 'TCS', quantity: 5, buyPrice: 3200, ltp: 3350, pnl: 750 },
  { id: 3, symbol: 'HDFCBANK', quantity: 8, buyPrice: 1450, ltp: 1520, pnl: 560 },
];

export const login = async (brokerId, credentials) => {
    // Hardcoded valid credentials
    const validCredentials = {
      username: 'admin',
      password: 'password123'
    };
  
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
  
    // Check if fields are empty
    if (!credentials.username || !credentials.password) {
      return { status: 400, error: 'Username and password are required' };
    }
  
    // Check if credentials match
    if (credentials.username === validCredentials.username && 
        credentials.password === validCredentials.password) {
      return { 
        status: 200, 
        data: { 
          token: 'mock-token', 
          user: 'mock-user',
          brokerId: brokerId
        } 
      };
    } else {
      // Always return 400 for wrong credentials
      return { status: 400, error: 'Invalid credentials' };
    }
    
   
  };