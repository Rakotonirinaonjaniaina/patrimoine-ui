import React from 'react';

const DateInput = ({ label, value, onChange }) => (
  <div>
    <label>
      {label} :
      <input type="date" value={value} onChange={onChange} required />
    </label>
  </div>
);

export default DateInput;
