"use client";

import React, { useEffect } from "react";
import { Button, Form as AntdForm, Input, message } from "antd";
import styled from "styled-components";
import { useRegisterAccountQueryMutation } from "@/modules/rtk/accountsQuery";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const [trigger, { data, isError, error }] = useRegisterAccountQueryMutation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isError && error) {
      messageApi.open({
        type: "error",
        content: (error as any)?.data?.message || "Error when creating account",
        duration: 3,
      });
    }

    if (data && !isError) {
      messageApi.open({
        type: "success",
        content: (data as any)?.message,
        duration: 3,
      });

      form.resetFields();
    }
  }, [isError, data, error, messageApi, form]);

  const onFinish = (values: any) => {
    const { email, password, username } = values;
    trigger({
      email: email.trim(),
      password: password.trim(),
      username: username.trim(),
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Password must be at least 4 characters",
              min: 4,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Username must be at least 4 characters!",
              whitespace: true,
              min: 4,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item shouldUpdate {...tailFormItemLayout}>
          {() => (
            <ButtonContainer>
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Register
              </Button>
              <Button
                type="link"
                block
                href="/"
                style={{ width: "fit-content" }}
              >
                Go to Login
              </Button>
            </ButtonContainer>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

const Form = styled(AntdForm)`
  @media (max-width: 576px) {
    width: 80%;
  }
  max-width: 650px;
  width: 500px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default RegisterForm;
