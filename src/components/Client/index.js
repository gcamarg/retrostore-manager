import React from "react";
import "./style.css";
import ProductCard from "../ProductCard";
import Form from "../Form";
import Header from "../Header";

export default function Client() {
  return (
    <>  
      <Header />
       <section className="home-container">
      <ProductCard />
      <div className="brand-container">
        <div className="brand-name">
          <div id="brand-text">
            <span className="gradient-1">RETRO </span>
            <span className="gradient-2">STORE</span>
          </div>
        </div>
        <Form />
      </div>
      <footer>
        <p className="footer-text">© 2021 RetroStore</p>
      </footer>
    </section>
    </>
  );
}
