import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from "yup"
const PersonalPage = () => {
  const canvasRef = useRef(null);
  const [dataUser, SetdataUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const Formik = useFormik({
    initialValues: {
      Fullname: "",
      Title: ""
    },
    validationSchema: Yup.object({
      Title: Yup.string().required("Hãy nhập Mô tả"),
      Fullname: Yup.string().required("Hãy nhập Họ tên")
    
    }),
    onSubmit: async(values)=>{
      setLoading(true)
      const res = await axios({url:"https://backend-task-manager-one.vercel.app/user/Update",method:"PUT",data:values, headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("Token")}`,

      }})

      if(res.data.code = 200)
      {
        toast.success(res.data.message)
      }
      else
      {
        toast.error(res.data.message)
      }
      setLoading(true)

    }


  })


  const Call_API_DATA_User = async () => {
    setLoading(true);
    const res = await axios({
      url: "https://backend-task-manager-one.vercel.app/user/Detail",
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      }
    });
    SetdataUser(res.data);
    setLoading(false);
  };

  useEffect(() => {
    Call_API_DATA_User();
  }, []);

  useEffect(() => {
    if (dataUser.UserDetail) {
      const fullName = dataUser?.UserDetail?.Fullname;
      const parts = fullName.split(" "); // Tách chuỗi theo khoảng trắng
      const lastName = parts[parts.length - 1]; // Lấy phần tử cuối cùng
      const firstLetter = lastName.charAt(0); // Lấy chữ cái đầu tiên

      // Vẽ chữ cái đầu tiên lên canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa mọi hình vẽ trước đó
      ctx.font = "48px Arial";
      ctx.fillStyle = "#000"; // Màu chữ
      ctx.textAlign = "center"; // Căn giữa
      ctx.textBaseline = "middle"; // Căn giữa theo chiều dọc
      ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2); // Vẽ chữ cái lên canvas
    }
  }, [dataUser]);

  return (
    <div className="container position-relative" style={{ marginTop: "20px" }}>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div
        className="card"
        style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
      >
        <canvas
          ref={canvasRef}
          width="150"
          height="150"
          style={{
            margin: "20px auto",
            display: "block",
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
          }}
        ></canvas>
        <div className="card-body text-center">
          {editMode ? (
            <div>
              <input
                type="text"
                id='Email'
                value={dataUser.UserDetail?.Email}
                onChange={handleInputChange}
                className="form-control mb-2"
                disabled
                placeholder="Email"
              />
              <input
                type="text"
                id='Fullname'
                value={dataUser.UserDetail?.Fullname}
                onChange={handleInputChange}
                className="form-control mb-2"
                placeholder="Tên của bạn"
              />
              {Formik.errors.Fullname && <i className='text-danger my-2 ms-2'>{Formik.errors.Fullname}</i>}
              <textarea
                id='Title'
                value={dataUser.UserDetail?.Title}
                onChange={handleInputChange}
                className="form-control mb-2"
                rows="3"
                placeholder="Title"
              ></textarea>
              {Formik.errors.Title && <i className='text-danger my-2 ms-2'>{Formik.errors.Title}</i>}
            </div>
          ) : (
            <>
              <h1 className="card-title" style={{ fontSize: "2rem" }}>
                {dataUser.UserDetail?.Fullname}
              </h1>
              <p className="card-text" style={{ fontStyle: "italic", color: "#555" }}>
                {dataUser.UserDetail?.Title}

              </p>
              <p className="card-text" style={{ color: "#333" }}>
                {dataUser.UserDetail?.Email}
              </p>
              <ul className="list-unstyled">


                <li>
                  <strong>Tổng số dự án:</strong> {dataUser.ProjectTotal}
                </li>
              </ul>
            </>
          )}

          <button
            className={`btn ${editMode ? "btn-success" : "btn-primary"} mt-3`}
            onClick={editMode ? handleSave : handleEditToggle}
          >
            {editMode ? "Lưu thay đổi" : "Chỉnh sửa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
