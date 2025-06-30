import React, { useState } from "react";
import "./NumberField.css";

const NumberField = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatCurrency = (val) => {
    if (!val) return "";
    const num = parseFloat(val);
    return isNaN(num) ? "" : num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
  };
  return (
    <>
      <div className="input-field">
        <label htmlFor="inputField" className="input-label">
          {props.label}
        </label>
        <input
          id="inputField"
          type="text"
          placeholder={props.placeholder || "Enter value .."}
          value={isEditing ? props.value : formatCurrency(props.value)}
          onChange={(e) => {
            // Remove non-numeric characters except period
            const raw = e.target.value.replace(/[^0-9.]/g, "");
            props.onChange(raw);
          }}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          className="w-full p-2 border rounded"
        />
      </div>
    </>
  );
};

export default NumberField;
