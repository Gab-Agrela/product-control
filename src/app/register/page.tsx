"use client";

import RegisterForm from "@/domain/Register/RegisterForm";
import React from "react";
import styled from "styled-components";

const Register: React.FC = () => {
  return (
    <RegisterContainer>
      <Title>Register</Title>
      <RegisterForm />
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
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

export default Register;
