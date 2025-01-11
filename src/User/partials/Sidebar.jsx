import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Nút Toggle (chỉ hiển thị trên màn hình nhỏ) */}
      <button
        className="navbar-toggler d-lg-none"
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          {/* Logo Section */}
          <div className="d-flex align-items-center mb-5">
            <img
              width="48"
              height="48"
              className="me-2"
              src="https://img.icons8.com/color/48/github--v1.png"
              alt="github--v1"
            />
            <h4>argon</h4>
          </div>

          {/* Navigation Links */}
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/Task/dashboard"
                className={({ isActive }) =>
                  isActive ? 'nav-link fw-bold text-Gradian' : 'nav-link fw-bold'
                }
              >
                <i className="bi bi-house-fill text-primary me-3 pt-1 fw-bold"></i> Trang chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/task/project"
                className={({ isActive }) =>
                  isActive ? 'nav-link fw-bold text-Gradian' : 'nav-link fw-bold'
                }
              >
                <i className="bi bi-list-task me-3 pt-1 fw-bold"></i> Dự án
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Task/personal"
                className={({ isActive }) =>
                  isActive ? 'nav-link fw-bold text-Gradian' : 'nav-link fw-bold'
                }
              >
                <i className="bi bi-list-task me-3 pt-1 fw-bold"></i> Tài khoản
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Task/group"
                className={({ isActive }) =>
                  isActive ? 'nav-link fw-bold text-Gradian' : 'nav-link fw-bold'
                }
              >
                <i className="bi bi-list-task me-3 pt-1 fw-bold"></i> Làm nhóm
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Task/join"
                className={({ isActive }) =>
                  isActive ? 'nav-link fw-bold text-Gradian' : 'nav-link fw-bold'
                }
              >
                <i className="bi bi-list-task me-3 pt-1 fw-bold"></i> Tham gia
              </NavLink>
            </li>
            <li className="nav-item">
              <div
                onClick={() => {
                  localStorage.removeItem('Token');
                  navigate('/');
                }}
                className="nav-link fw-bold"
              >
                <i className="bi bi-box-arrow-left me-3 pt-1 fw-bold"></i> Đăng xuất
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
