import { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../service/auth.service";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await AuthService.register(
        user.username,
        user.fullName,
        user.email,
        user.password
      );
      if (newUser.status === 200) {
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: newUser.data.message,
        }).then(() => {
          setUser({
            username: "",
            fullName: "",
            email: "",
            password: "",
          });
          navigate("/login");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-2xl glass">
        <div className="card-body space-y-4">
          <h2 className="text-4xl font-bold text-center text-primary">
            สมัครสมาชิก
          </h2>
          <p className="text-center text-gray-500 mb-2">สร้างบัญชีใหม่ของคุณ</p>

          {/* Username */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">ชื่อผู้ใช้</span>
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="ชื่อผู้ใช้"
              required
              className="input input-bordered"
            />
          </div>

          {/* Full Name */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">ชื่อเต็ม</span>
            </label>
            <input
              type="text"
              name="fullName"
              className="input input-bordered focus:input-primary"
              placeholder="ชื่อ-นามสกุล"
              required
              value={user.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">อีเมล</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered focus:input-primary"
              placeholder="email"
              required
              value={user.email}
              onChange={handleChange}
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
              className="input input-bordered focus:input-primary"
              placeholder="password"
              required
              value={user.password}
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <div className="form-control mt-6 space-y-3">
            <button
              type="submit"
              className="btn btn-primary w-full text-white"
              onClick={handleSubmit}
            >
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
