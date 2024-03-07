"use client";

import styled from "styled-components";

export default function OptionsTable({
  description,
}: {
  description: Array<{ color: string; price: number }>;
}) {
  console.log(description);
  return (
    <Table>
      <THead>
        <th>Color</th>
        <th>Price</th>
      </THead>
      <TBody>
        {description?.map(({ color, price }) => (
          <tr>
            <td>{color}</td>
            <td>{price}</td>
          </tr>
        ))}
      </TBody>
    </Table>
  );
}

const Table = styled.table`
  border-bottom: 1px solid dimgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
`;
const THead = styled.thead`
  th {
    width: 80px;
    border-bottom: 2px solid dimgray;
    font-size: 18px;
    padding: 3px 10px;
  }
`;
const TBody = styled.tbody`
  td {
    font-size: 18px;
    width: 80px;
    text-align: center;
    font-weight: 500;
    padding: 3px 10px;
    text-transform: capitalize;
    border-bottom: 1px solid dimgray;
  }
  margin-bottom: 20px;
`;
