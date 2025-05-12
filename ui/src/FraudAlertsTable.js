import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "./axiosConfig";

function FraudAlertsTable() {
  const [alerts, setAlerts] = React.useState([]);

  React.useEffect(() => {
    axios.get("/api/fraud-alerts").then(res => setAlerts(res.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Alert Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(alert => (
            <TableRow key={alert.transactionId}>
              <TableCell>{alert.transactionId}</TableCell>
              <TableCell>{alert.userId}</TableCell>
              <TableCell>{alert.reason}</TableCell>
              <TableCell>{alert.alertTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FraudAlertsTable;
