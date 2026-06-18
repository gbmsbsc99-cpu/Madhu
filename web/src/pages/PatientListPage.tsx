import React, { useState } from 'react';
import './PatientListPage.css';

const PatientListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients] = useState([
    { id: '1', mrn: 'MR001', firstName: 'John', lastName: 'Doe', age: 45, status: 'Admitted' },
    { id: '2', mrn: 'MR002', firstName: 'Jane', lastName: 'Smith', age: 32, status: 'Outpatient' },
  ]);

  const filteredPatients = patients.filter(
    (p) =>
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.includes(searchTerm)
  );

  return (
    <div className="patient-list-page">
      <div className="page-header">
        <h1>Patients</h1>
        <button className="btn btn-primary">+ New Patient</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or MRN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="patient-table">
        <table>
          <thead>
            <tr>
              <th>MRN</th>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.mrn}</td>
                <td>{patient.firstName} {patient.lastName}</td>
                <td>{patient.age}</td>
                <td>
                  <span className={`status status-${patient.status.toLowerCase()}`}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-info">View</button>
                  <button className="btn btn-sm btn-secondary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientListPage;
