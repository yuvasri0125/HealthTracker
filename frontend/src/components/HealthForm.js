import React, { useState } from 'react';


const HealthForm = ({ onAdd }) => {
const [date, setDate] = useState('');
const [weight, setWeight] = useState('');
const [bp, setBp] = useState('');
const [notes, setNotes] = useState('');


const submit = (e) => {
e.preventDefault();
if (!date) return alert('Select a date');
onAdd({ date, weight: weight ? Number(weight) : undefined, bp, notes });
setDate(''); setWeight(''); setBp(''); setNotes('');
};


return (
<form onSubmit={submit} style={{ marginBottom: '1.5rem' }}>
<div>
<label>Date</label><br />
<input type="date" value={date} onChange={e => setDate(e.target.value)} required />
</div>
<div>
<label>Weight (kg)</label><br />
<input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
</div>
<div>
<label>Blood Pressure</label><br />
<input type="text" value={bp} onChange={e => setBp(e.target.value)} placeholder="120/80" />
</div>
<div>
<label>Notes</label><br />
<textarea value={notes} onChange={e => setNotes(e.target.value)} />
</div>
<button type="submit">Add Record</button>
</form>
);
};


export default HealthForm;