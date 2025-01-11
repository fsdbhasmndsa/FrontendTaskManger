import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Logo Section */}
      <div className="d-flex align-items-center mb-5">
        <img
          width="48"
          height="48"
          className="me-2"
          src="https://img.icons8.com/color/48/github--v1.png"
          alt="github--v1"
        />
        <h2
          className="fw-bold"
          style={{
            background: "linear-gradient(87deg, #11cdef, #1171ef)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          argon
        </h2>
      </div>

      {/* Navigation Links */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/Task/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-house-fill text-primary me-3 pt-1 fw-bold"></i>{" "}
            Trang chủ
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/task/project"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i> Dự án
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/Task/personal"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i> Tài khoản
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/Task/group"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i> Làm nhóm
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/Task/join"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i> Tham gia
          </NavLink>
        </li>
        <li className="nav-item">
          <div
            onClick={() => {
              localStorage.removeItem("Token");
              navigate("/");
            }}
            className="nav-link"
          >
            <i className="bi bi-box-arrow-left me-3 pt-1 fw-bold"></i> Đăng xuất
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
