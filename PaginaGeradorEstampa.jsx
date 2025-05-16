import React, { useState } from 'react';
import EstampaPreview from './EstampaPreview';

export default function PaginaGeradorEstampa() {
  const [imagens, setImagens] = useState([]);

  const gerarImagens = async () => {
    const urls = await Promise.all([
      fetchImagemIA(),
      fetchImagemIA()
    ]);
    setImagens(urls);
  };

  const fetchImagemIA = async () => {
    return 'https://via.placeholder.com/1024?text=Estampa';
  };

  const gerarPSD = () => alert('Função de gerar PSD ainda em desenvolvimento.');
  const refazerEstampa = () => setImagens([]);
  const baixarEstampaAlta = (index) => alert(`Baixando estampa ${index + 1} em alta resolução...`);

  return (
    <div>
      <h1>Gerador de Estampas</h1>
      <button onClick={gerarImagens}>Gerar Estampas</button>
      {Array.isArray(imagens) && imagens.length > 0 && (
        <EstampaPreview
          imagens={imagens}
          onGerarPSD={gerarPSD}
          onRefazer={refazerEstampa}
          onDownloadAlta={baixarEstampaAlta}
        />
      )}
    </div>
  );
}
