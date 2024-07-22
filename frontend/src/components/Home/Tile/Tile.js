import React from 'react';
import DvrIcon from '@mui/icons-material/Dvr';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language'; // Assuming this is for IoT functionality
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import './Tile.css'

const Tile = ({ icon, title, description }) => {
  const iconMap = {
    'Configure': <DvrIcon />,
    'Settings': <SettingsIcon />,
    'IoT': <LanguageIcon />, // Assuming IoT functionality
    'Task Manager': <ManageHistoryIcon />,
  };

  const selectedIcon = iconMap[title]; // Look up icon based on title

  return (
    <div className="tile">
      <div className="content">
        {selectedIcon && <span className="icon">{selectedIcon}</span>}
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default Tile;
