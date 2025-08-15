import React, { useState } from 'react';

function AddStudent({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [amount, setAmount] = useState('');
  const [feesStatus, setFeesStatus] = useState('Unpaid');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { name, email, course, amount, feesStatus };
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    onBack();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <select value={feesStatus} onChange={(e) => setFeesStatus(e.target.value)}>
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Half-paid</option>
      </select>
      <button type="submit">Add</button>
      <button onClick={onBack}>Back</button>
    </form>
  );
}

export default AddStudent;