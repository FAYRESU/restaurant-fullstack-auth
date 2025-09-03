import React, { useState, useEffect } from "react";
import AuthService from "../service/auth.service";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login: loginFn, user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await AuthService.login(
        login.username,
        login.password
      );
      if (currentUser.status === 200) {
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: "ยินดีต้อนรับ!",
        }).then(() => {
          loginFn(currentUser.data);
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบล้มเหลว",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-300 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-2xl glass rounded-2xl border border-gray-200 flex justify-center">
        <div className="card-body space-y-6 text-center">
          {/* Header */}
          <div>
            <h2 className="text-4xl font-extrabold text-indigo-600 drop-shadow">
              เข้าสู่ระบบ
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              กรุณากรอกชื่อผู้ใช้และรหัสผ่านของคุณ
            </p>
          </div>

          {/* Username */}
          <div className="form-control">
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="ชื่อผู้ใช้"
              required
              className="input input-bordered input-primary rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 text-center"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="รหัสผ่าน"
              required
              className="input input-bordered input-primary rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 text-center"
            />
          </div>

          {/* Buttons */}
          <form
            className="form-control mt-6 space-y-3 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <button
              type="submit"
              className="btn btn-primary w-3/4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 text-white"
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              className="btn btn-outline btn-error w-3/4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
              onClick={() => setLogin({ username: "", password: "" })}
            >
              ยกเลิก
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
