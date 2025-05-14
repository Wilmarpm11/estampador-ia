
import React, { useState } from 'react';

export default function EstampaPreview({ imagens, onRefazer }) {
  const [baixando, setBaixando] = useState(null);

  const baixarImagem = async (url, index) => {
    setBaixando(index);
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `estampa_${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setBaixando(null), 1500);
  };

  return (
    <div className="preview-container">
      <h2>Pré-visualização da Estampa</h2>
      <p>Formato ideal para impressão digital (300DPI - 50x50cm - CMYK simulado)</p>
      <div className="imagens-grid">
        {imagens.map((src, index) => (
          <div key={index} className="estampa-card">
            <img src={src} alt={`Estampa ${index + 1}`} className="estampa-preview" />
            <button onClick={() => baixarImagem(src, index)}>
              {baixando === index ? "Baixando..." : `Baixar Estampa ${index + 1} (JPG)`}
            </button>
          </div>
        ))}
      </div>
      <div className="botoes">
        <button onClick={onRefazer}>Refazer Estampa</button>
      </div>
    </div>
  );
}
