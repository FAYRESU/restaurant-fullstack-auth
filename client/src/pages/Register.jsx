import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ 🎉",
          text: "คุณสามารถเข้าสู่ระบบได้แล้ว",
          confirmButtonColor: "#4ade80", // green
        }).then(() => {
          navigate("/login");
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: data.message || "ไม่สามารถลงทะเบียนได้",
          confirmButtonColor: "#ef4444", // red
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "การเชื่อมต่อล้มเหลว",
        text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form className="card-body space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            สมัครสมาชิก
          </h2>
          <p className="text-center text-gray-500 mb-4">
            กรอกข้อมูลด้านล่างเพื่อสร้างบัญชีของคุณ
          </p>

          {/* Username */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              className="input input-bordered focus:input-primary"
              placeholder="ชื่อผู้ใช้"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Full Name */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              className="input input-bordered focus:input-primary"
              placeholder="ชื่อเต็ม"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered focus:input-primary"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered focus:input-primary"
              placeholder="รหัสผ่าน"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full text-white"
            >
              สมัครสมาชิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
