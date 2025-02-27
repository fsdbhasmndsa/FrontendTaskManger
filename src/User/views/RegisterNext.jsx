import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { data, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup"
import GoogleLoginButton from './GoogleLoginButton';

const RegisterNext = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const Navigation = useNavigate();
    const { Email } = location.state || {};
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const FormIk = useFormik({
        initialValues: {
            Email: Email,
            Password: "",
            Fullname: ""
        },
        validationSchema: Yup.object({
            Password: Yup.string().required("Hãy nhập Mật khẩu").max(10, "Mật khẩu <= 10").min(3, "Mật khẩu >= 3 "),
            Fullname: Yup.string().required("Hãy nhập Họ và tên").max(30, "Họ và tên <= 30").min(3, "Họ và tên >= 10")
        }),
        onSubmit: async (values) => {
            setLoading(true);

            const res = await axios({
                url: "https://backend-task-manager-one.vercel.app/user/register",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                data: values,
            })

            if (res.data.code == 400) {
                toast.error(res.data.message)
                setLoading(false);
            }
            if (res.data.code == 200) {
                setLoading(false);
                toast.success(res.data.message)
                Navigation("/")
            }

        }


    })


    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 position-relative">

            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {/* Logo */}
            <div className="mb-4">
                <img width="48" height="48" className='me-2' src="https://img.icons8.com/color/48/github--v1.png" alt="github--v1" />
            </div>

            {/* Tiêu đề */}
            <h2 className="fw-bold mb-4">Nhập mật khẩu của bạn</h2>

            {/* Form */}
            <form className="w-100" style={{ maxWidth: "400px" }} onSubmit={FormIk.handleSubmit}>
                {/* Email hiển thị */}
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Địa chỉ Email*
                    </label>
                    <input
                        value={FormIk.values.Email}
                        type="Email"
                        id="Email"
                        className="form-control"
                        placeholder="Nhập Email của bạn"
                        disabled
                    />

                </div>

                {/* Input mật khẩu */}
                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">
                        Mật khẩu*
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="Password"
                        className="form-control"
                        placeholder="Nhập mật khẩu"
                        onChange={FormIk.handleChange}
                    />
                    <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none"
                        onClick={togglePasswordVisibility}
                    >
                        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                    {FormIk.errors.Password && <i className='text-danger my-2'>{FormIk.errors.Password}</i>}
                </div>

                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                        Họ và tên*
                    </label>
                    <input

                        type="text"
                        id="Fullname"
                        className="form-control"
                        placeholder="Nhập Name của bạn"
                        onChange={FormIk.handleChange}
                    />
                    {FormIk.errors.Fullname && <i className='text-danger my-2'>{FormIk.errors.Fullname}</i>}
                </div>

                {/* Quên mật khẩu */}
                <div className="mb-3 text-end">
                    <NavLink to={"/forgotpassword"} style={{ textDecoration: "none" }} className="text-success">
                        Quên mật khẩu?
                    </NavLink>
                </div>

                {/* Nút tiếp tục */}
                <div className="mb-3">
                    <button className="btn btn-success w-100 py-2">Đăng kí</button>
                </div>

                {/* Đăng ký */}
                <div className="text-center mb-3">
                    Bạn đã có sẵn tài khoản?{" "}
                    <NavLink to={"/login"} style={{ textDecoration: "none" }} className="text-success">
                        Đăng nhập
                    </NavLink>
                </div>

                {/* Hoặc */}
                <div className="d-flex align-items-center mb-3">
                    <hr className="flex-grow-1" />
                    <span className="mx-2 text-muted">HOẶC</span>
                    <hr className="flex-grow-1" />
                </div>

                {/* Các nút đăng nhập khác */}
                <GoogleLoginButton></GoogleLoginButton>

            </form>
        </div>
    )
}

export default RegisterNext