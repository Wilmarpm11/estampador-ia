
import React, { useState } from 'react';
import { gerarPrompt } from './geradorPrompt';
import EstampaPreview from './EstampaPreview';

export default function PaginaGeradorEstampa() {
  const [estilo, setEstilo] = useState('');
  const [cores, setCores] = useState('');
  const [fundo, setFundo] = useState('');
  const [imagens, setImagens] = useState([]);

  const gerarImagens = async () => {
    const prompt = gerarPrompt({ estilo, cores, fundo });

    const urls = await Promise.all([
      fetchGeradorIA(prompt),
      fetchGeradorIA(prompt + ' variação')
    ]);

    setImagens(urls);
  };

  const fetchGeradorIA = async (prompt) => {
    console.log('Gerando imagem com prompt:', prompt);
    return 'https://via.placeholder.com/300x300.png?text=Estampa';
  };

  const gerarPSD = () => {
    alert('Função de exportar para PSD em construção.');
  };

  const refazerEstampa = () => {
    setImagens([]);
    gerarImagens();
  };

  return (
    <div className="pagina">
      <h1>Gerador de Estampa com IA</h1>
      <input placeholder="Estilo da estampa" value={estilo} onChange={(e) => setEstilo(e.target.value)} />
      <input placeholder="Cores principais" value={cores} onChange={(e) => setCores(e.target.value)} />
      <input placeholder="Cor de fundo" value={fundo} onChange={(e) => setFundo(e.target.value)} />
      <button onClick={gerarImagens}>Gerar imagem com IA</button>

      {imagens.length > 0 && (
        <EstampaPreview
          imagens={imagens}
          onGerarPSD={gerarPSD}
          onRefazer={refazerEstampa}
        />
      )}

      <style jsx>{`
        .pagina {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        input {
          display: block;
          margin: 0.5rem auto;
          padding: 0.5rem;
          width: 100%;
          max-width: 400px;
        }
        button {
          margin-top: 1rem;
          padding: 0.6rem 1.2rem;
        }
      `}</style>
    </div>
  );
}
