import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import './Sidebar.css';

const Sidebar = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [sidebarData, setSidebarData] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const dataFromLocation = location.state?.tile || [];
    setSidebarData(dataFromLocation);
  }, [location]);

  const handleToggle = async (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSubItemClick = async (subItem) => {
    if (subItem === 'User') {
      try {
        const response = await axios.get('/api/all-users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setUserData(response.data);
        navigate('/dashboard/user_details', { state: { userData: response.data } });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <a href="#" role="button">
          <span>safetywhat</span>
        </a>
      </div>
      <ul className="sidebar-list">
        {Object.entries(sidebarData.value || {}).map(([key, values], index) => (
          <li key={index}>
            <a href="#" onClick={(e) => { e.preventDefault(); handleToggle(index); }} aria-expanded={expandedIndex === index}>
              <i className={`bi bi-${index === 0 ? 'people' : index === 1 ? 'shield-check' : 'tag'}`}></i>
              <span>{key}</span>
              {values.length > 0 && <i className="bi bi-arrow-down-short"></i>}
            </a>
            {expandedIndex === index && values.length > 0 && (
              <ul className="sidebar-sub-list">
                {values.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <span onClick={() => handleSubItemClick(subItem)}>{subItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
