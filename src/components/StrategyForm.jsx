import { useState } from "react";
import axios from "axios";
import InputField from "./InputField/InputField";
import NumberField from "./NumberField/NumberField";
import LabeledSelect from "./Select/LabeledSelect";
import Button from "./Button/Button";

const INDICATOR_FIELDS = {
  RSI: [ "value","period"],
  EMA: [ "value","period"],
  EMA_CROSS: ["fast", "slow"],
  MACD: ["value"],
  MACD_HIST: ["value"],
};

const defaultCondition = {
  indicator: "RSI",
  operator: "<",
  value: 30,
  period: 14,
};

function StrategyForm({ onResult }) {
  const [symbol, setSymbol] = useState("AAPL");
  const [from, setFrom] = useState("2024-01-01");
  const [to, setTo] = useState("2024-06-30");
  const [timeframe, setTimeframe] = useState("1d");
  const [stopLoss, setStopLoss] = useState(5.0);
  const [entryConditions, setEntryConditions] = useState([{ ...defaultCondition }]);
  const [exitConditions, setExitConditions] = useState([
    { indicator: "RSI", operator: ">", value: 70, period: 14 },
  ]);

  const handleChange = (listSetter, i, field, value) => {
    listSetter((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [field]: value };
      return updated;
    });
  };

  const addCondition = (listSetter) => {
    listSetter((prev) => [...prev, { ...defaultCondition }]);
  };

  const removeCondition = (listSetter, i) => {
    listSetter((prev) => prev.filter((_, index) => index !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      symbol,
      from_: from,
      to,
      timeframe,
      stopLoss: parseFloat(stopLoss),
      entry: entryConditions,
      exit: exitConditions
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/backtest`,
      payload
    );
    onResult(res.data);
  };

  const renderConditionFields = (cond, i, listSetter) => {
    const fields = INDICATOR_FIELDS[cond.indicator] || [];
    return (
      <div
        key={i}
        style={{
          marginBottom: "1rem",
          border: "1px solid #ccc",
          padding: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <LabeledSelect
          label="Indicator"
          id={`indicator-${i}`}
          value={cond.indicator}
          onChange={(e) => handleChange(listSetter, i, "indicator", e.target.value)}
          options={Object.keys(INDICATOR_FIELDS).map((ind) => ({ label: ind, value: ind }))}
        />

        <LabeledSelect
          label="Operator"
          id={`operator-${i}`}
          value={cond.operator}
          onChange={(e) => handleChange(listSetter, i, "operator", e.target.value)}
          options={[
            { label: "<", value: "<" },
            { label: ">", value: ">" },
            { label: "==", value: "==" }
          ]}
        />

        {fields.map((field) => (
          <InputField
            label={field}
            key={field}
            type="number"
            placeholder={field}
            value={cond[field] || ""}
            onChange={(val) => handleChange(listSetter, i, field, val)}
          />
        ))}
        <div style={{display:"flex", alignItems:"center"}}>
        <Button type="button" onClick={() => removeCondition(listSetter, i)}>
          Remove
        </Button>
        </div>
      </div>
    );
  };

  return (
    <form style={{ padding: "1rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <InputField label="Symbol" value={symbol} onChange={setSymbol} placeholder="Symbol" />
        <InputField label="From" value={from} onChange={setFrom} type="date" />
        <InputField label="To" value={to} onChange={setTo} type="date" />
        <LabeledSelect
          label="Timeframe"
          id="timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          options={[
            { value: "1d", label: "1 Day" },
            { value: "1h", label: "1 Hour" },
            { value: "30m", label: "30 Minutes" },
            { value: "15m", label: "15 Minutes" },
          ]}
        />
        <InputField
          label="Stop Loss(%)"
          type="number"
          value={stopLoss}
          onChange={setStopLoss}
          placeholder="Stop Loss %"
          step="0.01"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "1rem" }}>
        <div>
          <h4>Entry Conditions</h4>
          {entryConditions.map((cond, i) => renderConditionFields(cond, i, setEntryConditions))}
          <button type="button" onClick={() => addCondition(setEntryConditions)}>+ Add Entry Condition</button>
        </div>

        <div>
          <h4>Exit Conditions</h4>
          {exitConditions.map((cond, i) => renderConditionFields(cond, i, setExitConditions))}
          <button type="button" onClick={() => addCondition(setExitConditions)}>+ Add Exit Condition</button>
        </div>
      </div>

      <br />
      <Button onClick={handleSubmit}>Run Backtest</Button>
    </form>
  );
}

export default StrategyForm;
