import React, { useEffect, useState } from "react";

function App() {
  const [records, setRecords] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    bloodPressure: "",
    sugarLevel: ""
  });

  // Fetch records from backend
  const fetchRecords = () => {
    fetch("http://localhost:5000/api/records")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched records:", data); // <-- debug
        setRecords(data);
      })
      .catch(err => {
        console.log("Fetch error:", err);
        alert("Fetch error — check console");
      });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add Record
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
        bloodPressure: formData.bloodPressure,
        sugarLevel: Number(formData.sugarLevel)
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Added record:", data);
        fetchRecords(); // Refresh list
        setFormData({ name: "", age: "", weight: "", height: "", bloodPressure: "", sugarLevel: "" });
      })
      .catch(err => {
        console.log("Add error:", err);
        alert("Add error — check console");
      });
  };

  // Handle Delete Record
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/records/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        if (selectedId === id) setSelectedId(null);
        fetchRecords();
      })
      .catch(err => {
        console.log("Delete error:", err);
        alert("Delete error — check console");
      });
  };

  return (
    <div style={{
  padding: "20px",
  maxWidth: "700px",
  margin: "0 auto",
  background: "pink",
  minHeight: "100vh"
}}>

      <h1 style={{ color: "red", fontWeight: "bold", marginLeft: 20 }}>Health Tracker</h1>

      <h2>Records (click any record):</h2>
      {records.length === 0 ? (
        <p>No records found</p>
      ) : (
        records.map((r) => {
          const isSelected = selectedId === (r._id ?? r.id ?? r.id); // handle both possible ids
          return (
            <div
              key={r._id ?? r.id}
              onClick={() => {
                console.log("Record clicked:", r);
                alert("Clicked record id: " + (r._id ?? r.id)); // visible proof
                setSelectedId(r._id ?? r.id);
              }}
              style={{
    marginBottom: "15px",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    background: "White"   // 🌟 Peach color added
  }}
            >
              <p><strong>Name:</strong> {r.name}</p>
              <p><strong>Age:</strong> {r.age}</p>
              <p><strong>Weight:</strong> {r.weight}</p>
              <p><strong>Height:</strong> {r.height}</p>
              <p><strong>Blood Pressure:</strong> {r.bloodPressure}</p>
              <p><strong>Sugar Level:</strong> {r.sugarLevel}</p>
              <p><strong>Created At:</strong> {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}</p>

              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(r._id ?? r.id); }}
                style={{
                  background: isSelected ? "#c82727" : "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginTop: "5px"
                }}
              >
                Delete
              </button>
            </div>
          );
        })
      )}

      <h2>Add New Record</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} required />
        <input type="number" name="height" placeholder="Height" value={formData.height} onChange={handleChange} required />
        <input type="text" name="bloodPressure" placeholder="Blood Pressure" value={formData.bloodPressure} onChange={handleChange} required />
        <input type="number" name="sugarLevel" placeholder="Sugar Level" value={formData.sugarLevel} onChange={handleChange} required />
        <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>Add Record</button>
      </form>
    </div>
  );
}

export default App;
