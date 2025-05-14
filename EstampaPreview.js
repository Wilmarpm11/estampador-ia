
import React, { useState } from 'react';

export default function EstampaPreview({ imagens, onRefazer }) {
  const [baixando, setBaixando] = useState(null);

  const baixarImagem = async (url, index) => {
    setBaixando(index);
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `estampa_${index + 1}.psd`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setBaixando(null), 1500);
  };

  return (
    <div className="preview-container">
      <h2>Pré-visualização da Estampa</h2>
      <div className="imagens-grid">
        {imagens.map((src, index) => (
          <div key={index} className="estampa-card">
            <img src={src} alt={`Estampa ${index + 1}`} className="estampa-preview" />
            <button onClick={() => baixarImagem(src, index)}>
              {baixando === index ? "Baixando PSD..." : `Baixar Estampa ${index + 1}`}
            </button>
          </div>
        ))}
      </div>
      <div className="botoes">
        <button onClick={onRefazer}>Refazer Estampa</button>
      </div>

      <style jsx>{`
        .preview-container {
          margin-top: 2rem;
          text-align: center;
        }
        .imagens-grid {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .estampa-card {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .estampa-preview {
          max-width: 400px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          margin-bottom: 0.5rem;
        }
        .botoes {
          margin-top: 1.5rem;
        }
        button {
          padding: 0.6rem 1.2rem;
          border: none;
          background: #0070f3;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background: #005dc1;
        }
      `}</style>
    </div>
  );
}
