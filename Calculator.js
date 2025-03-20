import React, { useState } from "react";

const Calculator = () => {
  const [numbers, setNumbers] = useState("");
  const [average, setAverage] = useState(null);
  const [error, setError] = useState("");

  const calculateAverage = async () => {
    try {
      setError("");
      const numArray = numbers.split(",").map(num => parseFloat(num.trim()));

      if (numArray.some(isNaN)) {
        setError("Please enter valid numbers separated by commas.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers: numArray }),
      });

      const data = await response.json();
      if (response.ok) {
        setAverage(data.average);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Average Calculator</h2>
      <input
        type="text"
        placeholder="Enter numbers (e.g., 10, 20, 30)"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={calculateAverage} style={{ marginLeft: "10px", padding: "8px 15px" }}>
        Calculate
      </button>
      {average !== null && <h3>Average: {average}</h3>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Calculator;
