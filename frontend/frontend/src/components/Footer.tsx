import styles from "./styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright &copy; <strong>Daniel Barrera</strong> 2024. Todos los derechos reservados
      </p>
    </footer>
  );
};

export default Footer;
