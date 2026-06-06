import React, { useState, useEffect } from 'react';
import './App.css';
import brasaoCapivara from '/capivarabrasao.png';
import SearchIcon from '@mui/icons-material/Search';
import Confetti from 'react-confetti';

export default function App() {
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState({ msg: '', tipo: '' });
  const [mostrarDica, setMostrarDica] = useState(false);
  const [venceu, setVenceu] = useState(false);

  useEffect(() => {
    console.log(
      "%c⚠️ ATENÇÃO INTEGRANTES DA CASA CAPIVARA:",
      "color: #d61c22; font-size: 14px; font-weight: bold;"
    );

    console.log(
      "Vocês estão no lugar certo! Agora inspecionem a árvore de elementos do HTML (aba Elements) para encontrar a chave sagrada."
    );
  }, []);

  const checarSenha = () => {
    const chave = "capivariasUnidas2026";

    if (senha.trim() === chave) {
      setStatus({
        msg: "",
        tipo: "sucesso"
      });

      setVenceu(true);

      // para os confetes após 6 segundos
      setTimeout(() => {
        setVenceu(false);
      }, 10000);

    } else {
      setStatus({
        msg: "Chave incorreta.",
        tipo: "erro"
      });
    }
  };

  return (
    <div className="wrapper">

      {venceu && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={700}
          gravity={0.2}
        />
      )}

      {/* [CASA CAPIVARA - JUNTOS SOMOS MAIS FORTES]
        Parabéns por inspecionar a estrutura!
        A senha secreta para dar a vitória à sua equipe é:

        capivariasUnidas2026
      */}

      <div className="card">
        <img
          src={brasaoCapivara}
          alt="Brasão Casa Capivara"
          className="brasao-img"
        />

        <div className="form-enigma">
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
            />

            <button
              onClick={checarSenha}
              className="btn-enigma"
            >
              OK
            </button>
          </div>
        </div>

        {status.msg && (
          <span className={`feedback ${status.tipo}`}>
            {status.msg}
          </span>
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
            color: '#272323bd'
          }}
        />
      </button>

      {mostrarDica && (
        <div className="dica-lateral">
          <p>
            💡 <strong>Dica:</strong> O verdadeiro desenvolvedor
            enxerga através da estrutura. Use o <strong>F12</strong>
            e inspecione a página!
          </p>
        </div>
      )}
    </div>
  );
}