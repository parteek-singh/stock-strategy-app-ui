// components/TradeTable.jsx
import React from "react";
import "./TradeTable.css"; // You can create and import this for additional styling

export default function TradeTable({ result }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Total Trades: {result.total_trades}</h2>
      <h3>Total PnL: {result.total_pnl_pct}%</h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
              <th style={thStyle}>Entry</th>
              <th style={thStyle}>Exit</th>
              <th style={thStyle}>PnL %</th>
              <th style={thStyle}>Reason</th>
            </tr>
          </thead>
          <tbody>
            {result.trades.map((trade, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={tdStyle}>{trade.entry_date}</td>
                <td style={tdStyle}>{trade.exit_date}</td>
                <td style={tdStyle}>{trade.pnl_pct}</td>
                <td style={tdStyle}>{trade.entry_reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "0.75rem",
  borderBottom: "2px solid #ccc",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "0.75rem",
};
