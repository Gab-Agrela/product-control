import React from "react";

import LoginForm from "@/domain/Login/LoginForm";

const Login: React.FC = () => {
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
      <p style={{ fontSize: "28px", paddingBottom: "20px" }}>Login</p>
      <LoginForm />
    </div>
  );
};

export default Login;
