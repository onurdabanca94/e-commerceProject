import { useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";
import Header from "./Header";
import ProductList from "./ProductList";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:5057/api/products")
    .then(response => response.json())
    .then(data => setProducts(data));
  }, []);

  function addProduct(){
    // products.push({ id: 4, name: "product 4", price: 4000, is_active: true})
    setProducts([...products, 
      {
        id: Date.now(), 
        name: "product 4", 
        price: 4000, 
        isActive: true
      }])
  }

  return (
    <>
      <Header products={products}/>
      <ProductList products={products} addProduct={addProduct} />
    </>
  )
}

export default App;
