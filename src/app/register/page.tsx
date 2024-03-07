import RegisterForm from "@/domain/Register/RegisterForm";
import React from "react";

const Register: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "95dvh",
      }}
    >
      <p style={{ fontSize: "28px", paddingBottom: "20px" }}>Register</p>
      <RegisterForm />
    </div>
  );
};

export default Register;
