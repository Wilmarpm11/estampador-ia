import React from 'react';

export default function EstampaPreview({ imagens, onGerarPSD, onRefazer }) {
  return (
    <div className="preview-container">
      <h2>Visualização das Estampas</h2>
      <div className="imagens">
        {imagens.map((url, index) => (
          <div key={index} className="estampa-card">
            <img src={url} alt={`Estampa ${index + 1}`} />
            <button onClick={() => onGerarPSD(index)}>Baixar p/ Impressão</button>
          </div>
        ))}
      </div>
      <button className="refazer" onClick={onRefazer}>Refazer Estampa</button>

      <style jsx>{`
        .preview-container {
          margin-top: 2rem;
        }
        .imagens {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        .estampa-card {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        img {
          width: 400px;
          height: 400px;
          object-fit: cover;
          border-radius: 8px;
        }
        button {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
        .refazer {
          margin-top: 1.5rem;
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </div>
  );
}
