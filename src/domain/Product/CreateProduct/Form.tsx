"use client";

import React, { useEffect } from "react";
import { Button, Form as AntdForm, Input, message } from "antd";
import styled from "styled-components";

import { useCreateProductQueryMutation } from "@/modules/rtk/productQuery";

interface CreateProductFormProps {
  handleCancel: () => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [trigger, { data, isError, error }] = useCreateProductQueryMutation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isError && error) {
      messageApi.open({
        type: "error",
        content: (error as any)?.data?.message || "Error when creating product",
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
    const { name, brand, model, price, color } = values;
    trigger({
      name: name.trim(),
      brand: brand.trim(),
      model: model.trim(),
      price,
      color: color.trim(),
    });
    handleCancel();
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="createProduct"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name must be at least 4 characters!",
              whitespace: true,
              min: 4,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[
            {
              required: true,
              message: "Brand must be at least 4 characters!",
              whitespace: true,
              min: 4,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="model"
          label="Model"
          rules={[
            {
              required: true,
              message: "Model must be at least 4 characters!",
              whitespace: true,
              min: 4,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="color"
          label="Color"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Create
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

const Form = styled(AntdForm)`
  @media (max-width: 576px) {
    width: 70%;
  }
  max-width: 650px;
  width: 400px;
`;

export default CreateProductForm;
