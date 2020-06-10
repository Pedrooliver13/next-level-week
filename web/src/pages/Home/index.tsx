import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import Logo from "../../assets/logo.svg";

import "./styles.css";

const Header = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={Logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>
            Seu Marketplace <br />
            de coleta de resíduos
          </h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>

          <Link to="/create-points">
            <span>
              <FiLogOut />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Header;
