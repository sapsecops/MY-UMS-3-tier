import React, { useState } from 'react';
import { BACKEND_URL } from '../config';

function EditStudent({ student, onUpdate }) {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [course, setCourse] = useState(student.course);
  const [amount, setAmount] = useState(student.amount);
  const [feesStatus, setFeesStatus] = useState(student.feesStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStudent = { name, email, course, amount, feesStatus };
    await fetch(`${BACKEND_URL}/students/${student.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent),
    });
    onUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <select value={feesStatus} onChange={(e) => setFeesStatus(e.target.value)}>
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Half-paid</option>
      </select>
      <button type="submit">Update</button>
    </form>
  );
}

export default EditStudent;