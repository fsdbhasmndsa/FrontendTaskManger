import React from 'react';
import { NavLink } from 'react-router-dom';
const Home = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column ">
      {/* Row chứa hai cột */}
      <div className="row flex-grow-1">
        {/* Cột bên trái */}
        <div className="col-6 d-flex flex-column justify-content-center align-items-start p-5" style={{ background: `linear-gradient(87deg, #11cdef, #1171ef)`}}>
          <h1 className="text-light fw-bold display-4">Task Mangagement</h1>
          <p className="fs-4">Specify your goals and tasks</p>
        </div>

        {/* Cột bên phải */}
        <div className="col-6 d-flex flex-column justify-content-center align-items-center bg-white">
          <h2 className="fw-bold mb-4">Get started</h2>
          <div>
            <NavLink to={"/login"} className="btn btn-primary me-3 px-4 py-2 my-2">Đăng nhập</NavLink>
            <NavLink to={"/register"} className="btn btn-outline-primary px-4 py-2 my-2">Đăng kí</NavLink>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Home;
