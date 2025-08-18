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
  }, [user]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body space-y-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">เข้าสู่ระบบ</h2>
            <p className="text-sm text-gray-500 mt-1">
              กรุณากรอกชื่อผู้ใช้และรหัสผ่าน
            </p>
          </div>

          {/* Username */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">ชื่อผู้ใช้</span>
            </label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="ชื่อผู้ใช้"
              required
              className="input input-bordered"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">รหัสผ่าน</span>
            </label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="รหัสผ่าน"
              required
              className="input input-bordered"
            />
          </div>

          {/* Action Buttons */}
          <form className="form-control mt-4 space-y-2" onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-primary w-full">
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              className="btn btn-outline btn-error w-full"
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
