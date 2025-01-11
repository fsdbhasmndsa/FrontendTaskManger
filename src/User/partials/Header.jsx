import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = ({ toggleSidebar }) => {
  const [NameUser, SetNameUser] = useState([]);

  const GET_Name_User = async () => {
    const res = await axios({
      url: "https://backend-task-manager-one.vercel.app/user/getnameuser",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });

    SetNameUser(res.data.Name);
  };

  useEffect(() => {
    GET_Name_User();
  }, []);

  return (
    <header className="header d-flex align-items-center justify-content-between px-4 py-3">
      <button
        className="btn btn-outline-primary d-lg-none"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list"></i>
      </button>
      <div className="user-info d-flex align-items-center">
        <span className="user-name me-3">HELLO, {NameUser}</span>
      </div>
    </header>
  );
};

export default Header;
