
import React, { useState } from 'react';

export default function PaginaGeradorEstampa() {
  const [estilo, setEstilo] = useState('');
  const [cores, setCores] = useState('');
  const [fundo, setFundo] = useState('');
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erroBigJPG, setErroBigJPG] = useState(false);

  const gerarPrompt = ({ estilo, cores, fundo }) => {
    return `Estampa com estilo ${estilo}, nas cores ${cores}, com fundo ${fundo}, realista, tileável, 300DPI, 50x50cm, padrão CMYK.`;
  };

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

  const upscaleComBigJPG = async (imageUrl) => {
    const apiKey = process.env.NEXT_PUBLIC_BIGJPG_API_KEY;
    try {
      const criarTarefa = await fetch('https://bigjpg.com/api/task/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: imageUrl,
          type: 'photo',
          noise: 3,
          scale: 8,
        }),
      });

      const { id } = await criarTarefa.json();

      for (let i = 0; i < 10; i++) {
        await new Promise((res) => setTimeout(res, 4000));
        const statusResp = await fetch(`https://bigjpg.com/api/task/${id}/`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        const status = await statusResp.json();
        if (status.status === 'success' && status.output_url) {
          window.open(status.output_url, '_blank');
          return;
        }
      }

      throw new Error('Upscale demorou demais ou falhou.');
    } catch (error) {
      console.error('Erro no BigJPG:', error);
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
              <button onClick={() => upscaleComBigJPG(url)}>Baixar p/ Impressão</button>
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
          width: 100%;
          max-width: 480px;
          height: auto;
          margin-bottom: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}
