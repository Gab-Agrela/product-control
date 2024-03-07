"use client";

import React, { useEffect, useState } from "react";
import { Table, TableProps } from "antd";

import { useFetchProductsQuery } from "@/modules/rtk/productQuery";
import OptionsTable from "./OptionsTable";

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
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={!isFetching ? formattedProductData : []}
        onChange={handleChange}
        expandable={{
          expandedRowRender: ({ description }) => (
            <OptionsTable description={description} />
          ),
        }}
      />
    </>
  );
};

export default ProductTable;
