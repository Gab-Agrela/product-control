"use client";

import React from "react";
import styled from "styled-components";

import LoginForm from "@/components/LoginForm";

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <Title>Login</Title>
      <LoginForm />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 95dvh;
`;

const Title = styled.p`
  font-size: 28px;
  padding-bottom: 20px;
`;

export default Login;
