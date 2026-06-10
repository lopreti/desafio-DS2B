import React, { useState } from "react";
import "./App.css";
import Confetti from "react-confetti";

export default function App() {
  const perguntas = [
    {
      pergunta: "Qual comando cria um novo projeto Node.js?",
      alternativas: ["npm install", "npm init", "node start", "npm create"],
      correta: 1,
      fragmento: "67",
    },
    {
      pergunta:
        "Qual Hook é usado para armazenar estado em um componente React?",
      alternativas: ["useEffect", "useRef", "useState", "useMemo"],
      correta: 2,
      fragmento: "sx",
    },
    {
      pergunta: "Qual atributo substitui 'class' em JSX?",
      alternativas: ["cssClass", "styleClass", "jsxClass", "className"],
      correta: 3,
      fragmento: "69",
    },
  ];

  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState(null);
  const [fragmentos, setFragmentos] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  const [shake, setShake] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [tentativasErradas, setTentativasErradas] = useState(0);

  const verificarResposta = () => {
    if (bloqueado) return;
    if (selecionada === null) return;

    const atual = perguntas[indice];

    if (selecionada === atual.correta) {
      setFragmentos((prev) => [...prev, atual.fragmento]);

      if (indice < perguntas.length - 1) {
        setIndice((prev) => prev + 1);
        setSelecionada(null);
      } else {
        setFinalizado(true);
      }
    } else {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 500);

      const novosErros = tentativasErradas + 1;

      setTentativasErradas(novosErros);

      const tempoBloqueio = novosErros * 3;

      setBloqueado(true);
      setTempoRestante(tempoBloqueio);

      const intervalo = setInterval(() => {
        setTempoRestante((tempo) => {
          if (tempo <= 1) {
            clearInterval(intervalo);
            setBloqueado(false);
            return 0;
          }

          return tempo - 1;
        });
      }, 1000);
    }
  };

  if (finalizado) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
          numberOfPieces={1200}
          gravity={0.35}
        />

        <div className="tela-vitoria">
          <h1>🎉 PARABÉNS 🎉</h1>

          <p>Vocês concluíram todos os desafios!</p>

          <div className="senha-final">
            <h3>Senha Liberada!</h3>

            <div className="lista-fragmentos">
              <span>67</span>
              <span>sx</span>
              <span>69</span>
            </div>

            <h3>
              Volte para a sala inicial e desbloqueie o notebook da sua equipe...
            </h3>

            <div className="senha">67sx69</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="wrapper">
      <div className={`card ${shake ? "shake" : ""}`}>
        <h2 className="titulo">Quiz Node/React</h2>

        <div className="contador">
          Pergunta {indice + 1} de {perguntas.length}
        </div>

        <p className="pergunta">{perguntas[indice].pergunta}</p>

        <div className="alternativas">
          {perguntas[indice].alternativas.map((alt, i) => (
            <button
              key={i}
              disabled={bloqueado}
              className={`alternativa ${
                selecionada === i ? "selecionada" : ""
              }`}
              onClick={() => setSelecionada(i)}
            >
              {String.fromCharCode(65 + i)}) {alt}
            </button>
          ))}
        </div>

        {bloqueado && (
          <div className="bloqueio">
            Tente novamente em: 
          </div>
        )}

        <button
          className="btn-enigma"
          onClick={verificarResposta}
          disabled={bloqueado}
        >
          {bloqueado
            ? `${tempoRestante}s`
            : "Confirmar Resposta"}
        </button>

        {fragmentos.length > 0 && (
          <div className="fragmentos">
            <h4>🔓 Fragmentos encontrados</h4>

            <div className="fragmentos-lista">
              {fragmentos.map((frag, index) => (
                <span key={index} className="fragmento">
                  {frag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}