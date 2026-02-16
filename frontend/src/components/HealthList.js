import React, { useState } from 'react';


const HealthList = ({ records, onUpdate, onDelete }) => {
const [editingId, setEditingId] = useState(null);
const [form, setForm] = useState({});


const startEdit = (rec) => { setEditingId(rec._id); setForm({ date: rec.date?.split('T')[0], weight: rec.weight || '', bp: rec.bp || '', notes: rec.notes || '' }); };
const cancelEdit = () => { setEditingId(null); setForm({}); };
const saveEdit = async (id) => { await onUpdate(id, { ...form, weight: form.weight ? Number(form.weight) : undefined }); setEditingId(null); };


return (
<div>
{records.length === 0 && <p>No records yet.</p>}
{records.map(rec => (
<div key={rec._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
{editingId === rec._id ? (
<div>
<input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
<input type="number" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} placeholder="weight" />
<input value={form.bp} onChange={e => setForm(f => ({ ...f, bp: e.target.value }))} placeholder="bp" />
<textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
<div>
<button onClick={() => saveEdit(rec._id)}>Save</button>
<button onClick={cancelEdit}>Cancel</button>
</div>
</div>
) : (
<div>
<div><strong>{new Date(rec.date).toLocaleDateString()}</strong></div>
<div>Weight: {rec.weight ?? '-'} kg</div>
<div>BP: {rec.bp ?? '-'}</div>
<div>Notes: {rec.notes ?? '-'}</div>
<div style={{ marginTop: 8 }}>
<button onClick={() => startEdit(rec)}>Edit</button>
<button onClick={() => onDelete(rec._id)}>Delete</button>
</div>
</div>
)}
</div>
))}
</div>
);
};


export default HealthList;