import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleSidebar } from '../slices/uiSlice';
import './Header.css';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="toggle-sidebar-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          ☰
        </button>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{user?.firstName} {user?.lastName}</span>
          <span className="user-role">{user?.role}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
