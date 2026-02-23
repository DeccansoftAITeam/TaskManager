import React from "react";

const FormField = ({ placeholder, value, onChange, type = "text", style = {} }) => (
  <input
    style={{ padding: "8px", width: "100%", ...style }}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default FormField;
