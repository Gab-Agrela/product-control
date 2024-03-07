"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Form as AntdForm, Input, message } from "antd";
import styled from "styled-components";

import { useLoginUserQueryMutation } from "@/modules/rtk/accountsQuery";
import { setUser } from "@/modules/rtk/user.slice";

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

const LoginForm: React.FC = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [trigger, { data, isError, error }] = useLoginUserQueryMutation();
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
    const { password, username } = values;
    trigger({
      password: password.trim(),
      username: username.trim(),
    });
  };

  if (data && !isError) {
    localStorage.setItem(
      "productControl",
      JSON.stringify({
        token: data.token,
        username: form.getFieldValue("username"),
      })
    );

    dispatch(setUser({ token: data.token }));

    navigate.push("/product");
  }

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
                Login
              </Button>
              <Button
                type="link"
                block
                href="/register"
                style={{ width: "fit-content" }}
              >
                Go to Register
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

export default LoginForm;
