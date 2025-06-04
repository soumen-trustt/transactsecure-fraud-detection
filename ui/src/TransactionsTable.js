import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from "@mui/material";
import axios from "./axiosConfig";
import { exportToCSV, exportToPDF } from "./utils/exportUtils";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function TransactionsTable() {
  const [transactions, setTransactions] = React.useState([]);
  const { email } = useContext(AuthContext);

  React.useEffect(() => {
    axios.get("/api/transactions").then(res => setTransactions(res.data));
  }, []);

  // Filter transactions for the logged-in user (by email or userId if available)
  const filteredTransactions = transactions.filter(tx => {
    // Prefer userEmail if present, fallback to userId if you have it in context
    if (tx.userEmail && email) return tx.userEmail === email;
    // else, just return all (or implement userId-based filtering if possible)
    return true;
  });

  const columns = ["id", "userId", "amount", "merchant", "status", "timestamp"];

  return (
    <>
      {filteredTransactions.length > 0 && (
        <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={() => exportToCSV(filteredTransactions, columns)}>
            Export to CSV
          </Button>
          <Button variant="contained" color="secondary" onClick={() => exportToPDF(filteredTransactions, columns)}>
            Export to PDF
          </Button>
        </Stack>
      )}
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
            {filteredTransactions.map(tx => (
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
    </>
  );
}

export default TransactionsTable;
