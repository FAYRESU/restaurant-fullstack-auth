import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/v1/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userToken", data.token);
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ 🎉",
          text: "ยินดีต้อนรับกลับ!",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          setLogin({ username: "", password: "" });
          setError("");
          navigate("/");
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: errorData.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form
          className="card-body space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-primary">
            เข้าสู่ระบบ
          </h2>

          {/* Username */}
          <div className="form-control">
            <label className="label font-medium">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="Your username"
              required
              className="input input-bordered focus:input-primary"
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
              value={login.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="input input-bordered focus:input-primary"
            />
          </div>

          {/* Buttons */}
          <div className="form-control mt-4 space-y-3">
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              className="btn btn-error w-full text-white"
              onClick={() => setLogin({ username: "", password: "" })}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
