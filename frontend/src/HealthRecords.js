import React, { useEffect, useState } from "react";
import axios from "axios";

function HealthRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/records")
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Health Records</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Weight</th>
            <th>Height</th><th>Blood Pressure</th><th>Sugar Level</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record._id}>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td>{record.weight}</td>
              <td>{record.height}</td>
              <td>{record.bloodPressure}</td>
              <td>{record.sugarLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HealthRecords;
