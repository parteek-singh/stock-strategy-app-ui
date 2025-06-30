import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import StrategyForm from './components/StrategyForm';
import TradeTable from './components/TradeTable';

import './App.css'

function App() {
  
  const [result, setResult] = useState(null);
  return (
    <>

      <div style={{ padding: "1rem" }}>
      <h1>📊 Stock Strategy Backtest</h1>
      <StrategyForm onResult={setResult} />
      {result && <TradeTable result={result} />}
    </div>
    </>
  )
}

export default App
