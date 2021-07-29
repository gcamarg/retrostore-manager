import React, { useState } from "react";
import { useHistory} from "react-router-dom"
import "./style.css"

export default function Header() {

  const [ isClientSide, setIsClientSide ] = useState(true)

  const history = useHistory();

 function handleManageClick(){
  history.push("/manager");
 }
 function handleClientClick(){
  history.push("/");
 }
  return (
    <>
      <header className="header">
        <a onClick={handleClientClick} className="brand">
          RETROSTORE
        </a>
        <nav>
          <ul className="nav-links">
            <li onClick={handleClientClick}>
              <a >Client</a>
            </li>
            <li onClick={handleManageClick}>
              <a >Gerenciar</a>
            </li>
          </ul>
        </nav>
      </header>

      {(history.location.pathname=='/manager') && <div className="side-nav">
          <nav className="side-links">
            <ul>
              <li>
                <a href="#">Client</a>
              </li>
              <li>
                <a href="#">Produtos</a>
              </li>
            </ul>
          </nav>
        </div>}
      </>
  );
}
