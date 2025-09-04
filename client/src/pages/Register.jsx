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
          title: "สมัครสมาชิกสำเร็จ",
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
        title: "สมัครสมาชิกไม่สำเร็จ",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-300 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-2xl glass rounded-2xl border border-gray-200">
        <div className="card-body space-y-6 text-center">
          {/* Header */}
          <h2 className="text-4xl font-extrabold text-indigo-600 drop-shadow">
            สมัครสมาชิก
          </h2>
          <p className="text-gray-600">สร้างบัญชีใหม่ของคุณ</p>

          {/* Form */}
          <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="ชื่อผู้ใช้"
              required
              className="input input-bordered input-primary w-3/4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 text-center"
            />

            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              placeholder="ชื่อ-นามสกุล"
              required
              className="input input-bordered input-primary w-3/4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 text-center"
            />

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="อีเมล"
              required
              className="input input-bordered input-primary w-3/4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 text-center"
            />

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="รหัสผ่าน"
              required
              className="input input-bordered input-primary w-3/4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 text-center"
            />

            <button
              type="submit"
              className="btn btn-primary w-3/4 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
              onClick={handleSubmit}
            >
              สมัครสมาชิก
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
