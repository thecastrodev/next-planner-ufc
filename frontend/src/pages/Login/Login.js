import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Footer from "../../components/Footer/Footer";
import "./Login.style.css";

export default function Login() {
  return (
    <div className="div-container">
      <Header />
      <form className="login-container">
        <h2>
          Entre com suas credenciais do{" "}
          <a target="_blank" href="https://si3.ufc.br/sigaa/verTelaLogin.do">
            SIGAA
          </a>
        </h2>
        <div className="credentials">
          <Input
            name={"username"}
            type={"text"}
            title={"Usuário"}
            placeholder={"username..."}
          />
          <br />
          <Input
            name={"password"}
            type={"password"}
            title={"Senha"}
            placeholder={"password..."}
          />
          <button className="btn-enter" type="submit">
            Entrar
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
