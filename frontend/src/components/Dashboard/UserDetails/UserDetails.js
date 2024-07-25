import React from 'react';
import { useLocation } from 'react-router-dom';
import './UserDetails.css'; // Import CSS file

const UserDetails = ({userData}) => {

  return (
    <div className="user-details">
      {userData ? (
        <table className="user-details-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>
                  <p>{user.first_name} {user.last_name}</p>
                  <p>{user.email}</p>
                </td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default UserDetails;
