
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
    const urls = await Promise.all([fetchImagem(prompt), fetchImagem(prompt + ' variação')]);
    setImagens(urls);
  };

  const fetchImagem = async (prompt) => {
    console.log('Gerando imagem:', prompt);
    return 'https://via.placeholder.com/400x400.png?text=Estampa';
  };

  const baixarEstampaAlta = (url, index) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `estampa_baixar_${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h1>Gerador de Estampa com IA</h1>
      <input placeholder="Estilo" value={estilo} onChange={e => setEstilo(e.target.value)} />
      <input placeholder="Cores principais" value={cores} onChange={e => setCores(e.target.value)} />
      <input placeholder="Cor de fundo" value={fundo} onChange={e => setFundo(e.target.value)} />
      <button onClick={gerarImagens}>Gerar Estampas</button>

      {Array.isArray(imagens) && imagens.length > 0 && (
        <EstampaPreview imagens={imagens} onDownloadAlta={baixarEstampaAlta} />
      )}

      <style jsx>{`
        .container {
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
