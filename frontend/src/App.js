import React, { useState, useEffect } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_URL = 'http://localhost:8080/api/students';

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Add new student
  const handleAddStudent = async (studentData) => {
    try {
      const response = await axios.post(API_URL, studentData);
      setStudents([...students, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Update student
  const handleUpdateStudent = async (id, studentData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, studentData);
      setStudents(students.map(s => s.id === id ? response.data : s));
      setEditingStudent(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Edit student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Management System</h1>
      </header>
      <div className="container">
        {showForm ? (
          <StudentForm
            student={editingStudent}
            onSubmit={editingStudent ? 
              (data) => handleUpdateStudent(editingStudent.id, data) : 
              handleAddStudent}
            onCancel={() => {
              setShowForm(false);
              setEditingStudent(null);
            }}
          />
        ) : (
          <button className="btn-add" onClick={() => setShowForm(true)}>
            Add New Student
          </button>
        )}
        <StudentList 
          students={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      </div>
    </div>
  );
}

export default App;