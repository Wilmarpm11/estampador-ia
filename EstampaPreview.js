
import React from 'react';

export default function EstampaPreview({ imagens, onDownloadAlta }) {
  return (
    <div className="preview-container">
      {imagens.map((url, index) => (
        <div key={index} className="estampa-box">
          <img src={url} alt={`Estampa ${index + 1}`} />
          <button onClick={() => onDownloadAlta(url, index)}>Baixar p/ Impressão</button>
        </div>
      ))}
      <style jsx>{`
        .preview-container {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .estampa-box {
          text-align: center;
        }
        img {
          max-width: 300px;
          border: 1px solid #ccc;
        }
        button {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
