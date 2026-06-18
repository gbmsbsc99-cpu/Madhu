import React from 'react';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Hospital Dashboard</h1>
        <p>Real-time patient and operations overview</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Admitted Patients</h3>
          <div className="stat-value">45</div>
          <p className="stat-change">+2 this week</p>
        </div>
        <div className="stat-card">
          <h3>Available Beds</h3>
          <div className="stat-value">155</div>
          <p className="stat-change">77% occupancy</p>
        </div>
        <div className="stat-card">
          <h3>Pending Tests</h3>
          <div className="stat-value">23</div>
          <p className="stat-change">8 critical</p>
        </div>
        <div className="stat-card">
          <h3>Appointments Today</h3>
          <div className="stat-value">18</div>
          <p className="stat-change">12 completed</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Recent Admissions</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Bed</th>
                <th>Admission Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>A-101</td>
                <td>2026-06-17</td>
                <td><span className="badge badge-primary">Stable</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h2>Critical Alerts</h2>
          <div className="alerts-list">
            <div className="alert alert-warning">
              <span className="alert-icon">⚠️</span>
              <div>
                <h4>Patient A-105: High Heart Rate</h4>
                <p>HR: 120 bpm - Review immediately</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
