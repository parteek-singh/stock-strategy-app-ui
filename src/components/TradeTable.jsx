// components/TradeTable.jsx
export default function TradeTable({ result }) {
    return (
      <div>
        <h2>Total Trades: {result.total_trades}</h2>
        <h3>Total PnL: {result.total_pnl_pct}%</h3>
        <table>
          <thead>
            <tr><th>Entry</th><th>Exit</th><th>PnL %</th><th>Reason</th></tr>
          </thead>
          <tbody>
            {result.trades.map((trade, i) => (
              <tr key={i}>
                <td>{trade.entry_date}</td>
                <td>{trade.exit_date}</td>
                <td>{trade.pnl_pct}</td>
                <td>{trade.entry_reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  