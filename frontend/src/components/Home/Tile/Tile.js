import React from 'react';
import DvrIcon from '@mui/icons-material/Dvr';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language'; 
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import './Tile.css';

const Tile = ({ title, description, onClick }) => {
  const iconMap = {
    'Configure': <DvrIcon />,
    'Settings': <SettingsIcon />,
    'IoT': <LanguageIcon />, 
    'Task Manager': <ManageHistoryIcon />,
  };

  const selectedIcon = iconMap[title];

  return (
    <div className="tile" onClick={onClick}>
      <div className="content">
        {selectedIcon && <span className="icon">{selectedIcon}</span>}
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default Tile;
