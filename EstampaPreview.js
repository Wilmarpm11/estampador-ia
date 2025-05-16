import React from 'react';

export default function EstampaPreview({ imagens, onGerarPSD, onRefazer, onDownloadAlta }) {
  return (
    <div className="preview-estampas">
      {imagens.map((url, index) => (
        <div key={index} className="estampa-container">
          <img src={url} alt={`Estampa ${index + 1}`} width={350} />
          <div className="botoes-estampa">
            <button onClick={() => onDownloadAlta(index)}>Baixar p/ Impressão</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <button onClick={onRefazer}>Refazer Estampa</button>
      </div>
    </div>
  );
}
