
import React, { useState } from 'react';
import { gerarPrompt } from './geradorPrompt';
import EstampaPreview from './EstampaPreview';

export default function PaginaGeradorEstampa() {
  const [estilo, setEstilo] = useState('');
  const [cores, setCores] = useState('');
  const [fundo, setFundo] = useState('');
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);

  const gerarImagens = async () => {
    setLoading(true);
    const prompt = gerarPrompt({ estilo, cores, fundo });

    const urls = await Promise.all([
      fetchDalleImage(prompt),
      fetchDalleImage(prompt + ' com variações realistas')
    ]);

    setImagens(urls);
    setLoading(false);
  };

  const fetchDalleImage = async (prompt) => {
    const response = await fetch("/api/gerar-imagem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.url;
  };

  const refazerEstampa = () => {
    setImagens([]);
    gerarImagens();
  };

  return (
    <div className="pagina">
      <h1>Gerador de Estampa para Impressão</h1>
      <input placeholder="Estilo da estampa (ex: folhagem natural, onça)" value={estilo} onChange={(e) => setEstilo(e.target.value)} />
      <input placeholder="Cores principais (ex: verde, bege, azul petróleo)" value={cores} onChange={(e) => setCores(e.target.value)} />
      <input placeholder="Cor de fundo (ex: branco, areia, lilás claro)" value={fundo} onChange={(e) => setFundo(e.target.value)} />
      <button onClick={gerarImagens} disabled={loading}>
        {loading ? 'Gerando estampa...' : 'Gerar estampa'}
      </button>

      {imagens.length > 0 && (
        <EstampaPreview
          imagens={imagens}
          onRefazer={refazerEstampa}
        />
      )}
    </div>
  );
}
