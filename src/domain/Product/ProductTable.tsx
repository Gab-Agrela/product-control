"use client";

import React, { useEffect, useState } from "react";
import { Popover, Table, TableProps, message } from "antd";

import {
  useDeleteProductQueryMutation,
  useFetchProductsQuery,
} from "@/modules/rtk/productQuery";
import OptionsTable from "./OptionsTable";
import { CiTrash } from "react-icons/ci";
import styled from "styled-components";

interface DataType {
  key: number;
  name: string;
  brand: string;
  model: string;
  description: Array<{ color: string; price: number }>;
}

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

const ProductTable: React.FC = () => {
  const {
    data: productData,
    isFetching,
    isLoading,
  } = useFetchProductsQuery({});

  const [trigger, { data, isError, error }] = useDeleteProductQueryMutation();

  const [formattedProductData, setFormattedProductData] =
    useState<Array<DataType>>();

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});

  useEffect(() => {
    const formatData = productData?.data?.map(
      ({ id, name, brand, model, options }) => {
        return {
          key: id,
          name,
          brand,
          model,
          description: options.map(({ color, price }) => ({
            color,
            price,
          })),
        };
      }
    );
    setFormattedProductData(formatData);
  }, [productData, isFetching, isLoading]);

  const handleChange: OnChange = (_, filters) => {
    setFilteredInfo(filters);
  };

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isError && error) {
      messageApi.open({
        type: "error",
        content: (error as any)?.data?.message || "Error when deleting product",
        duration: 3,
      });
    }

    if (data && !isError) {
      messageApi.open({
        type: "success",
        content: (data as any)?.message,
        duration: 3,
      });
    }
  }, [isError, data, error, messageApi]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: formattedProductData?.map(({ name }) => ({
        text: name,
        value: name,
      })),
      filteredValue: filteredInfo.name || null,
      onFilter: (value: string, record: { name: string | string[] }) =>
        record.name.includes(value),
      ellipsis: true,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: formattedProductData?.map(({ brand }) => ({
        text: brand,
        value: brand,
      })),
      filteredValue: filteredInfo.brand || null,
      onFilter: (value: string, record: { brand: string | string[] }) =>
        record.brand.includes(value),
      ellipsis: true,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      filters: formattedProductData?.map(({ model }) => ({
        text: model,
        value: model,
      })),
      filteredValue: filteredInfo.model || null,
      onFilter: (value: string, record: { model: string | string[] }) =>
        record.model.includes(value),
      ellipsis: true,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: ({ key }: { key: number }) => (
        <Popover content={"Delete product"}>
          <CiTrash
            style={{ cursor: "pointer" }}
            size={26}
            onClick={() => trigger({ id: key.toString() })}
          />
        </Popover>
      ),
    },
  ];

  return (
    <div style={{ marginLeft: "10%" }}>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={!isFetching ? formattedProductData : []}
        onChange={handleChange}
        pagination={false}
        expandable={{
          expandedRowRender: ({ description }) => (
            <OptionsTable description={description} />
          ),
        }}
      />
    </div>
  );
};

export default ProductTable;
