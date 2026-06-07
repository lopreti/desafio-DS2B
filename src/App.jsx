import React, { useState, useEffect } from "react";
import "./App.css";
import brasaoCapivara from "/capivarabrasao.png";
import SearchIcon from "@mui/icons-material/Search";
import Confetti from "react-confetti";

export default function App() {
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState({ msg: "", tipo: "" });
  const [mostrarDica, setMostrarDica] = useState(false);
  const [venceu, setVenceu] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [shake, setShake] = useState(false);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log(
      "%c⚠️ ATENÇÃO INTEGRANTES DA CASA CAPIVARA:",
      "color: #d61c22; font-size: 14px; font-weight: bold;",
    );

    console.log(
      "Vocês estão no lugar certo! Agora inspecionem a árvore de elementos do HTML (aba Elements) para encontrar a chave sagrada.",
    );
  }, []);

  const checarSenha = () => {
    if (bloqueado) return;

    const chave = "capivariasUnidas2026";

    if (senha.trim() === chave) {
      setStatus({
        msg: "",
        tipo: "sucesso",
      });

      setVenceu(true);

      setTimeout(() => {
        setVenceu(false);
      }, 20000);
    } else {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 500);

      setBloqueado(true);
      setContador(3);

      setStatus({
        msg: "Chave incorreta. Tente novamente em 3s",
        tipo: "erro",
      });

      const interval = setInterval(() => {
        setContador((prev) => {
          const novoValor = prev - 1;

          if (novoValor > 0) {
            setStatus({
              msg: ` Chave incorreta. Tente novamente em ${novoValor}s`,
              tipo: "erro",
            });

            return novoValor;
          }

          clearInterval(interval);

          setBloqueado(false);

          setStatus({
            msg: "",
            tipo: "",
          });

          return 0;
        });
      }, 1000);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checarSenha();
  };

  return (
    <div className="wrapper">
      {venceu && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
          numberOfPieces={1200}
          gravity={0.45}
          initialVelocityX={20}
          initialVelocityY={20}
          run={venceu}
        />
      )}

      <div className={`card ${shake ? "shake" : ""}`}>
        <img
          src={brasaoCapivara}
          alt="Brasão Casa Capivara"
          className="brasao-img"
        />

        <form className="form-enigma" onSubmit={handleSubmit}>
          <input
            type="email"
            value="casaCapivara@sesi.com.br"
            disabled
            className="input-enigma input-disabled"
          />

          <div className="input-group-row">
            <input
              type="text"
              placeholder="Senha de acesso..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="input-enigma"
              autoComplete="off"
              disabled={bloqueado || venceu}
            />

            <button
              type="submit"
              className="btn-enigma"
              disabled={bloqueado || venceu}
            >
              {bloqueado ? contador : "OK"}
            </button>
          </div>
        </form>

        {status.msg && (
          <span className={`feedback ${status.tipo}`}>{status.msg}</span>
        )}
      </div>

      <button
        className="lupa-btn"
        onClick={() => setMostrarDica(!mostrarDica)}
        title="Dica"
      >
        <SearchIcon
          sx={{
            fontSize: 32,
            color: "#272323bd",
          }}
        />
      </button>

      {mostrarDica && (
        <div className="dica-lateral">
          <p>
            💡 <strong>Dica:</strong> O verdadeiro desenvolvedor enxerga através
            da estrutura. <strong>Inspecione</strong> bem a página...
          </p>
        </div>
      )}
    </div>
  );
}
