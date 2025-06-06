// Utility functions to export table data to CSV and PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToCSV(data, columns, filename = 'transactions.csv') {
  const csvRows = [];
  csvRows.push(columns.join(','));
  for (const row of data) {
    const values = columns.map(col => JSON.stringify(row[col], replacer));
    csvRows.push(values.join(','));
  }
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

function replacer(key, value) {
  return value === null ? '' : value;
}

export function exportToPDF(data, columns, filename = 'transactions.pdf') {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('TRANSACTION DETAILS', 14, 16);
  const tableData = data.map(row => columns.map(col => row[col]));
  autoTable(doc, {
    head: [columns],
    body: tableData,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [0, 188, 212] },
    startY: 22,
    margin: { top: 20 },
  });
  doc.save(filename);
}
