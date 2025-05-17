import React from 'react';

export default function EstampaPreview({ imagens, onGerarPSD, onRefazer, onDownloadAlta }) {
  return (
    <div className="preview-container">
      <div className="grid">
        {imagens.map((url, index) => (
          <div key={index} className="preview-box">
            <img src={url} alt={`Estampa ${index + 1}`} className="preview-img" />
            <button onClick={() => onDownloadAlta(index)}>Baixar p/ Impressão</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={onGerarPSD}>Simular PSD</button>
        <button onClick={onRefazer}>Refazer Estampa</button>
      </div>
      <style jsx>{`
        .preview-container {
          margin-top: 2rem;
          text-align: center;
        }
        .grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .preview-box {
          border: 1px solid #ccc;
          padding: 1rem;
        }
        .preview-img {
          width: 300px;
          height: auto;
        }
        button {
          display: block;
          margin: 0.5rem auto 0;
        }
      `}</style>
    </div>
  );
}
