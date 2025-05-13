
import React from 'react';

export default function EstampaPreview({ imagens, onRefazer, onGerarPSD }) {
  return (
    <div className="preview-container">
      <h2>Pré-visualização da Estampa</h2>
      <div className="imagens-grid">
        {imagens.map((src, index) => (
          <img key={index} src={src} alt={`Estampa ${index + 1}`} className="estampa-preview" />
        ))}
      </div>
      <div className="botoes">
        <button onClick={onGerarPSD}>Gerar em PSD</button>
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
        }
        .estampa-preview {
          max-width: 300px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .botoes {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
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
