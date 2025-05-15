
import React, { useState } from 'react';
import { gerarPrompt } from './geradorPrompt';
import EstampaPreview from './EstampaPreview';

export default function PaginaGeradorEstampa() {
  const [estilo, setEstilo] = useState('');
  const [cores, setCores] = useState('');
  const [fundo, setFundo] = useState('');
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erroBigJPG, setErroBigJPG] = useState(false);

  const gerarImagens = async () => {
    const prompt = gerarPrompt({ estilo, cores, fundo });
    setLoading(true);
    setErroBigJPG(false);

    const urls = await Promise.all([
      fetchGeradorIA(prompt),
      fetchGeradorIA(prompt + ' variação')
    ]);

    setImagens(urls);
    setLoading(false);
  };

  const fetchGeradorIA = async (prompt) => {
    console.log('Gerando imagem com prompt:', prompt);
    return 'https://via.placeholder.com/1024x1024.png?text=Estampa+Alta';
  };

  const gerarPSD = (index) => {
    alert(`Iniciando download da estampa ${index + 1} em alta qualidade com BigJPG (upscale 8x)...`);
    try {
      window.open(imagens[index], '_blank');
    } catch (error) {
      setErroBigJPG(true);
    }
  };

  const refazerEstampa = () => {
    setImagens([]);
    gerarImagens();
  };

  return (
    <div className="pagina">
      <h1>Gerador de Estampa com IA</h1>
      <input placeholder="Estilo da estampa" value={estilo} onChange={(e) => setEstilo(e.target.value)} />
      <input placeholder="Cores principais" value={cores} onChange={(e) => setCores(e.target.value)} />
      <input placeholder="Cor de fundo" value={fundo} onChange={(e) => setFundo(e.target.value)} />
      <button onClick={gerarImagens} disabled={loading}>{loading ? 'Gerando imagens...' : 'Gerar imagem com IA'}</button>

      {erroBigJPG && <p style={{ color: 'red' }}>❗ Seus créditos no BigJPG podem ter acabado. Verifique sua conta para continuar usando o upscale.</p>}

      {imagens.length > 0 && (
        <div className="preview">
          {imagens.map((url, index) => (
            <div key={index} className="estampa">
              <img src={url} alt={`Estampa ${index + 1}`} />
              <button onClick={() => gerarPSD(index)}>Baixar p/ Impressão</button>
            </div>
          ))}
          <button onClick={refazerEstampa}>Refazer Estampa</button>
        </div>
      )}

      <style jsx>{`
        .pagina {
          max-width: 800px;
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
        .preview {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .estampa {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .estampa img {
          max-width: 300px;
          max-height: 300px;
          margin-bottom: 0.5rem;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
}
