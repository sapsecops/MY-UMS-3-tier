import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config';
import EditStudent from './EditStudent';

function StudentList({ onBack }) {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch(`${BACKEND_URL}/students`);
    const data = await res.json();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    await fetch(`${BACKEND_URL}/students/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleUpdate = () => {
    setEditingStudent(null);
    fetchStudents();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Amount</th>
            <th>Fees Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.amount}</td>
              <td>{student.feesStatus}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingStudent && <EditStudent student={editingStudent} onUpdate={handleUpdate} />}
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default StudentList;