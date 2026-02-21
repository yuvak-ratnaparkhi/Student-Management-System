import React from 'react';

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="student-list">
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found. Add a new student to get started.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll Number</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.rollNumber}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.department}</td>
                <td>{student.semester}</td>
                <td>
                  <button 
                    className="btn-edit" 
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => onDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;