import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { brokers } from "../api/mockApi";
import { login } from "../api/mockApi";
import { AppContext } from "../context/AppContext";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";

const BrokerLogin = () => {
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setCurrentBroker, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
//pankaj
  
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error", 
  });

  const handleBrokerSelect = (broker) => {
    setSelectedBroker(broker);
    setAlert({ ...alert, open: false }); 
  };

  const handleLogin = async () => {
    if (!selectedBroker) return;

    setLoading(true);
    try {
      const response = await login(selectedBroker.id, credentials);

      if (response.status === 200) {
       
        setCurrentBroker(selectedBroker);
        setIsLoggedIn(true);
        navigate("/app");
      } else if (response.status === 400) {
        
        setAlert({
          open: true,
          message: response.error || "Invalid credentials",
          severity: "error",
        });
      } else if (response.status === 500) {
        
        setAlert({
          open: true,
          message: "Server error. Please try again later.",
          severity: "error",
        });
      }
    } catch (err) {
      
      setAlert({
        open: true,
        message: "Network error. Please check your connection.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
      Select Your Broker Name
        
      </Typography>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>

      <Grid container spacing={6} sx={{ mt: 6 }} className="broker-name">
        {brokers.map((broker) => (
          <Grid item xs={12} sm={6} md={3} key={broker.id}>
            <Card
              onClick={() => handleBrokerSelect(broker)}
              sx={{
                cursor: "pointer",
                border:
                  selectedBroker?.id === broker.id
                    ? "2px solid #1976d2"
                    : "none",
              }}
              
            >
              <CardContent >
                <Typography variant="h6"  sx={{ textAlign: 'center' }}>{broker.name} </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${broker.logo}`}
                  alt={broker.name}
                  sx={{ objectFit: "contain", p: 1 }}
                  
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedBroker && (
        <Box sx={{ mt: 4, maxWidth: 400, mx: "auto" }}>
          <Typography variant="h5" gutterBottom align="center">
            Login to {selectedBroker.name}
          </Typography>

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
            disabled={loading || !credentials.username || !credentials.password}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BrokerLogin;
