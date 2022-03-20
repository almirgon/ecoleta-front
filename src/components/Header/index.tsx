import React from "react";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import { Link } from 'react-router-dom';
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/">
          <Logo />
        </Link>
        <Link className={styles.registerButton} to="/cadastro">
          Cadastrar Coleta
        </Link>
      </nav>
    </header>
  );
};

export default Header;
