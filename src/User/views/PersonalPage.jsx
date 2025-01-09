import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const PersonalPage = () => {
  const canvasRef = useRef(null);
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      Fullname: "",
      Title: "",
    },
    validationSchema: Yup.object({
      Fullname: Yup.string().required("Hãy nhập Họ tên"),
      Title: Yup.string().required("Hãy nhập Mô tả"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.put(
          "https://backend-task-manager-one.vercel.app/user/Update",
          values,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );

        if (res.data.code === 200) {
          toast.success(res.data.message);
          setDataUser((prev) => ({
            ...prev,
            UserDetail: { ...prev.UserDetail, ...values },
          }));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi cập nhật thông tin.");
      } finally {
        setLoading(false);
        setEditMode(false);
      }
    },
  });

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://backend-task-manager-one.vercel.app/user/Detail",
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      setDataUser(res.data);
    } catch (error) {
      toast.error("Không thể tải thông tin người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (dataUser.UserDetail) {
      const fullName = dataUser.UserDetail.Fullname || "";
      const lastName = fullName.split(" ").pop() || "";
      const firstLetter = lastName.charAt(0).toUpperCase();

      const canvas = canvasRef.current;
      if (canvas && firstLetter) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "48px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2);
      }
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
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
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
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                value={dataUser.UserDetail?.Email || ""}
                className="form-control mb-2"
                disabled
                placeholder="Email"
              />
              <input
                type="text"
                {...formik.getFieldProps("Fullname")}
                className="form-control mb-2"
                placeholder="Tên của bạn"
              />
              {formik.errors.Fullname && <i className="text-danger my-2 ms-2">{formik.errors.Fullname}</i>}
              <textarea
                {...formik.getFieldProps("Title")}
                className="form-control mb-2"
                rows="3"
                placeholder="Mô tả"
              ></textarea>
              {formik.errors.Title && <i className="text-danger my-2 ms-2">{formik.errors.Title}</i>}
              <button type="submit" className="btn btn-success mt-3" disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập nhật"}
              </button>
            </form>
          ) : (
            <>
              <h1 className="card-title" style={{ fontSize: "2rem" }}>
                {dataUser.UserDetail?.Fullname || "Chưa cập nhật"}
              </h1>
              <p className="card-text" style={{ fontStyle: "italic", color: "#555" }}>
                {dataUser.UserDetail?.Title || "Chưa cập nhật"}
              </p>
              <p className="card-text" style={{ color: "#333" }}>
                {dataUser.UserDetail?.Email || "Chưa cập nhật"}
              </p>
              <ul className="list-unstyled">
                <li>
                  <strong>Tổng số dự án:</strong> {dataUser.ProjectTotal || 0}
                </li>
              </ul>
            </>
          )}
         {editMode == false &&  <button className="btn btn-primary mt-3" onClick={() => setEditMode(true)}>
            Chỉnh sửa
          </button>}
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
