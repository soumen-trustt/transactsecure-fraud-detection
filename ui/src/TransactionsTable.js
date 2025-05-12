import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "./axiosConfig";

function TransactionsTable() {
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    axios.get("/api/transactions").then(res => setTransactions(res.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Merchant</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(tx => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{tx.userId}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.merchant}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>{tx.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionsTable;
