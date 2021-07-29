import React, { useState, useEffect } from "react";
import "./style.css";
import products from "../products.json";
import Header from "../Header";

export default function Management() {
  const [ searchedText, setSearchedText ] = useState()
  const [productInfo, setProductInfo] = useState({});
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [itemIndex, setItemIndex] = useState();
  const [productTab, setProductTab] = useState(false);
  const [productList, setProductList] = useState(
    JSON.parse(localStorage.getItem("productList"))
  );

  function loadJson() {
    if (productList === null) {
      setProductList(products);
    }
  }

  useEffect(() => {
    loadJson();
  }, []);

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);

  function handleSearch(e){
    setSearchedText(e.target.value.toUpperCase());
  }

  function handleAddBtn(e) {
    e.preventDefault();

    const existingSKU = productList.products.findIndex(
      (product) => product.SKU === productInfo.SKU
    );
    const prodArray = productList.products;

    if (existingSKU !== -1) {
      if (
        window.confirm(
          `SKU já associado ao seguinte produto:
            Produto: ${prodArray[existingSKU].name}
            Preço: ${prodArray[existingSKU].price}
            Estoque: ${prodArray[existingSKU].qty}
            Deseja adicionar quantidade ao produto cadastrado e atualizar valores?`
        )
      ) {
        prodArray[itemIndex].qty = parseInt(prodArray[itemIndex].qty) + parseInt( productInfo.qty);
        prodArray[itemIndex].price=productInfo.price;
        setProductList({
          products: [...prodArray],
          categories: [...productList.categories],
        });
        return
      } else {
        console.log("Cancelado.");
        return;
      }
    }
    setProductList({
      products: [...prodArray, productInfo],
      categories: [...productList.categories],
    });
  }

  function handleDelete(e) {
    const prod = productList.products;
    const resp = window.confirm(`Tem certeza que deseja excluir o produto "${productList.products[itemIndex].name}" ?`)
    if (resp){
      prod.splice(itemIndex, 1);
      setProductList({ products: prod, categories: productList.categories });
      setShowDeleteButton(false);
      setProductInfo({});
    }
  }

  async function handleInfoChange(e) {
    
    let itemSKU = e.target.getAttribute('id');
    if (e.target.tagName !== 'LI'){
      itemSKU = e.target.parentElement.getAttribute('id');
    }
    const filteredItem = () => {
      const idx = productList.products.findIndex(
        (prod) => prod.SKU == itemSKU
        );
        setItemIndex(idx);
      return idx;
    };
    setProductTab(true);
    setProductInfo(productList.products[filteredItem()]);
    setShowDeleteButton(true);
  }

  function handleProductInfo(e) {
    const key = e.target.getAttribute("id");
    const value = e.target.value;
    setProductInfo({ ...productInfo, [key]: value });
  }

  function handleShowProductTab() {
    setProductTab(!productTab);
  }

  function handleFormClear() {
    setProductInfo({});
    setShowDeleteButton(false);
  }

  function renderizar() {
    if (productList !== null) {
      return productList.products.map((product) => {
        if(searchedText === undefined || product.name.toUpperCase().includes(searchedText) || product.SKU.toUpperCase().includes(searchedText))
        {return (
          <li className="prod-item" onClick={handleInfoChange} key={product.SKU} id={product.SKU}>
            <span className="text-span" id={`prod-${product.SKU}`}>
              {product.name}
            </span>
            <span className="num-span" id={`sku-${product.SKU}`}>
              {product.SKU}
            </span>
            <span className="num-span" id={`sku-${product.SKU}`}>
              {product.price}
            </span>
            <span className="num-span" id={`qty-${product.SKU}`}>
              {product.qty}
            </span>
            <span className="num-span" id={`qty-${product.SKU}`}>
              {(parseFloat(product.price)*parseInt(product.qty)).toFixed(2)}
            </span>
          </li>
        );}
      });
    }
  }

  return (
    <>
      <Header />
      <div>
        <div className="main-Container">
          {/* <section> */}
          <section id="prod-table">
            <button
              type="button"
              onClick={handleShowProductTab}
              id="show-tab-button"
            >
              Cadastrar / Editar
            </button>
            {productTab && (
              <section id="form-section">
              <form onSubmit={handleAddBtn} id="prod-form">
                <button
                  type="button"
                  onClick={handleFormClear}
                  className="submit-button"
                  id="new-button"
                >
                  Novo
                </button>
                <input
                  type="text"
                  className="text-input"
                  id="name"
                  value={productInfo.name || ""}
                  onChange={handleProductInfo}
                  placeholder="Nome do Produto"
                  required
                />
                <input
                  type="text"
                  className="text-input"
                  id="SKU"
                  value={productInfo.SKU || ""}
                  onChange={handleProductInfo}
                  placeholder="SKU"
                  required
                />
                <input
                  type="number"
                  className="text-input"
                  id="qty"
                  value={productInfo.qty || ""}
                  onChange={handleProductInfo}
                  placeholder="Quatidade"
                  required
                />
                <textarea
                  className="text-input"
                  id="description"
                  value={productInfo.description || ""}
                  maxLength="300"
                  onChange={handleProductInfo}
                  placeholder="Descrição"
                  required
                />
                <input
                  type="number"
                  className="text-input"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  id="price"
                  value={productInfo.price || ""}
                  onChange={handleProductInfo}
                  placeholder="R$ XXX,XX"
                  required
                />
                <input
                  type="number"
                  className="text-input"
                  id="discount"
                  value={productInfo.discount || ""}
                  onChange={handleProductInfo}
                  placeholder="%"
                  required
                />
                <input
                  type="text"
                  className="text-input"
                  id="image"
                  value={productInfo.image || ""}
                  onChange={handleProductInfo}
                  placeholder="URL"
                  required
                />
                <input
                  type="option"
                  className="text-input"
                  id="category"
                  value={productInfo.category || ""}
                  onChange={handleProductInfo}
                  placeholder="Categoria"
                  required
                />
                <button type="submit" className="submit-button" id="add-button">
                  Cadastrar
                </button>
                {showDeleteButton && (
                  <button
                  type="button"
                  onClick={handleDelete}
                  className="submit-button"
                  id="delete-button"
                  >
                    Deletar
                  </button>
                )}
              </form>
            </section>
          )}
              <input type="text" id="searchField" onKeyUp={handleSearch} placeholder="Pesquisa por nome ou SKU"/>
            <ul>
              {productList !== null && (
                <li className="prod-item">
                  <span className="text-span list-header">Produto</span>
                  <span className="num-span list-header">SKU</span>
                  <span className="num-span list-header">Preço (Cr$)</span>
                  <span className="num-span list-header">Qde</span>
                  <span className="num-span list-header">Total (Cr$)</span>
                </li>
              )}
              {renderizar()}
            </ul>
          </section>
          
        </div>
      </div>
    </>
  );
}
