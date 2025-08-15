import React, { useState } from 'react';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="App">
      <h1>Student Management</h1>
      {view === 'home' && (
        <div>
          <button onClick={() => setView('add')}>Add Student</button>
          <button onClick={() => setView('list')}>Students List</button>
        </div>
      )}
      {view === 'add' && <AddStudent onBack={() => setView('home')} />}
      {view === 'list' && <StudentList onBack={() => setView('home')} />}
    </div>
  );
}

export default App;