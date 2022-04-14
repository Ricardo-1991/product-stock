import { SetStateAction } from "react";
import { Table } from "./styles";
import { GiShinyApple } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";

interface Product {
  productName: string;
  productCategory: string;
  runningOutProduct: boolean;
  productAmount: number;
}

interface ProductProps {
  product: Product[];
  setProduct: React.Dispatch<SetStateAction<Product[]>>;
}

export function FoodProductTable({ product, setProduct }: ProductProps) {
  function handleDeleteRow(id: number) {
    const getLocalStorage = JSON.parse(localStorage.getItem("product") || "");
    const productIndex = product.findIndex((product, index) => index == id);

    if (productIndex >= 0) {
      getLocalStorage.splice(productIndex, 1);
      localStorage.setItem("product", JSON.stringify(getLocalStorage));
      setProduct(getLocalStorage);
    }
  }
  return (
    <Table>
      <thead>
        <tr className="category-head">
          <th>
            PRODUTOS ALIMENTÍCIOS <br />
            <GiShinyApple size={30} color="#FF3333" />
          </th>
        </tr>
        <tr>
          <th>PRODUTO</th>
          <th>QUANTIDADE</th>
          <th>ESTOQUE</th>
          <th>DELETAR</th>
        </tr>
      </thead>
      <tbody>
        {product.map(
          (product, index) =>
            product.productCategory == "Alimentação" && (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.productAmount}</td>
                <td>
                  {product.runningOutProduct == false ? "Completo" : "Esgotado"}
                </td>
                <td>
                  <AiOutlineDelete
                    onClick={() => handleDeleteRow(index)}
                    size={25}
                  />
                </td>
              </tr>
            )
        )}
      </tbody>
    </Table>
  );
}
