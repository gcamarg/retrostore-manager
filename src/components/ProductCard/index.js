import React, { useState, useEffect } from "react";
import productsJson from "../products.json";
import "./style.css";

export default function ProductCard() {

  const [productId, setProductId] = useState(1);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  function loadProducts(){
    const productList = JSON.parse(localStorage.getItem("productList"));
    let items;
    if(productList === null){
      items = productsJson.products.length
      setProducts(productsJson.products);
      setCategories(productsJson.categories);
      localStorage.setItem("productList",JSON.stringify(productsJson)) 
    }else{
      items = productList.products.length
      setProducts(productList.products); 
      setCategories(productList.categories) 
    }
    start(items);
  }

  function start(items) {
    setInterval(() => {
      idUpdater(items);
    }, 8000);
  }
  
  function idUpdater(items) {
    const id = Math.floor(Math.random()*(items-3)) ;
    setProductId(id);
  }
  useEffect(() => {
    loadProducts();
    setProductId(0);
  }, []);

  function checkFreeShipping(price){
    if(price>=300){
      return 'FRETE GRÁTIS'
    }
  }
  function renderizar() {
    if (products !== null) {
      const renderedProducts=products.slice(productId, productId+4);
      return(renderedProducts.map((prod, index) => {
        // if (index >= productId && index < productId + 4) {
          return (
            <div className="product-card" key={prod.SKU}>
              <img
                className="product-image"
                src={prod.image}
                alt={prod.description}
                title={prod.description}
              />
              <p className="product-name">{prod.name}</p>
              <div className="original-price">de Cr$ <span>{parseFloat(prod.price).toFixed(2)}</span></div>
              <div className="price-box">
                <span className="product-price">
                  Cr$ {(parseFloat(prod.price)*(1-parseFloat(prod.discount)/100)).toFixed(2)}
                </span>
                <span className="discount-tag">
                  {prod.discount}% OFF
                </span>
              </div>
              <div className="extra-info">
                <span>à vista</span>
                <span>{checkFreeShipping(products[index].price)}</span>
              </div>
            </div>
          );
        // }
      }))
    }
  }
  return (
    <>
    <h2>PRODUTOS</h2>
    <section className="product-list">
      {/* <label htmlFor="Filtrar">Filtrar</label>
        <select name="categoria" id="categoria">
          {categories.map(cat => {
            return <option value={cat} key={cat}>{cat}</option>
          })}
          </select> */}
        
      {renderizar()}
    </section>
    </>
  );
}
