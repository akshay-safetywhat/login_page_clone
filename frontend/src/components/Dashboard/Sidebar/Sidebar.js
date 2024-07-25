import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './Sidebar.css';
import PermIdentityIcon from '@mui/icons-material/PermIdentity'; // User Management
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // Access Policies
import LabelIcon from '@mui/icons-material/Label'; // Labels
import UserDetails from '../UserDetails/UserDetails';

const Sidebar = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [sidebarData, setSidebarData] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dataFromLocation = data || [];
    setSidebarData(dataFromLocation.value || []); // Access nested data if applicable
  }, [data]);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSubItemClick = async (subItem) => {
    if (subItem) {
      try {
        if (subItem === 'User') {
          const response = await axios.get('/api/all-users', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          });
          setUserData(response.data);
          // navigate('/dashboard/user_details');
        } else {
          navigate('#');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.warn('Invalid sub-item:', subItem);
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul className="sidebar-list">
          {Object.entries(sidebarData).map(([key, values], index) => (
            <li key={index}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleToggle(index); }} aria-expanded={expandedIndex === index}>
                {key === 'User Management' && <PermIdentityIcon />}
                {key === 'Access Policies' && <VerifiedUserIcon />}
                {key === 'Labels' && <LabelIcon />}
                <span>{key}</span>
                {values.length > 0 && <i className="bi bi-arrow-down-short"></i>}
              </a>
              {expandedIndex === index && values.length > 0 && (
                <ul className="sidebar-sub-list">
                  {values.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a onClick={() => handleSubItemClick(subItem)}>
                        <span>{subItem}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='user-details'>
        {userData && <UserDetails userData={userData} />}
      </div>
    </>
  );
};

export default Sidebar;
