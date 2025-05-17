import { useState } from "react";

export default function EstampaGenerator() {
  const [theme, setTheme] = useState("folhagem tropical neon");
  const [colors, setColors] = useState("pink, azul, verde-limão");
  const [background, setBackground] = useState("branco");
  const [useFor, setUseFor] = useState("maiô");
  const [colorHarmony, setColorHarmony] = useState("nenhuma");
  const [referenceImage, setReferenceImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [editNote, setEditNote] = useState("");

  const generatePrompt = async () => {
    let generated = `Crie uma estampa digital contínua e perfeitamente repetível no tamanho 50x50cm, resolução 300DPI. O estilo da estampa deve ser: ${theme}. Use uma paleta de cores com: ${colors}, sobre um fundo ${background}. Esta estampa será aplicada em: ${useFor}. A arte deve ter alta definição, bordas suaves, riqueza de detalhes e acabamento ideal para impressão em tecidos.`;

    if (colorHarmony && colorHarmony !== "nenhuma") {
      generated += ` Utilize a harmonia de cores do tipo: ${colorHarmony}.`;
    }

    if (referenceImage) {
      generated += ` Considere como referência visual a imagem enviada com o nome: ${referenceImage.name}.`;
    } else {
      generated += ` Não há imagem de referência — a criação deve ser 100% original com base nas descrições fornecidas.`;
    }

    if (useFor.toLowerCase().includes('bikini') || useFor.toLowerCase().includes('maiô')) {
      generated += ' Os elementos visuais da estampa devem ser pequenos e delicados para melhor adaptação às peças menores como biquínis e maiôs.';
    } else if (useFor.toLowerCase().includes('saída') || useFor.toLowerCase().includes('midi')) {
      generated += ' Os elementos da estampa podem ser maiores e mais espaçados, já que serão aplicados em peças maiores como saídas de praia e vestidos midi.';
    }

    generated += ' Para a coloração, aplique o princípio visual da regra 60-30-10, onde 60% da estampa utiliza a cor dominante, 30% cores secundárias e 10% de destaque. Utilize boas práticas de harmonização como monocromia, análogas, complementares e tríades, conforme técnicas clássicas de composição de cores (como as abordadas no blog.eduk.com.br).';

    setPrompt(generated);

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: generated,
          n: 2,
          size: "1024x1024",
          response_format: "url"
        })
      });

      const data = await response.json();
      const urls = data?.data?.map(obj => obj.url).filter(Boolean);
      if (urls && urls.length > 0) {
        setImageUrls(urls);
        setImageUrl(urls[0]);
        urls.forEach((url, i) => {
          const link = document.createElement("a");
          link.href = url;
          link.download = `estampa-${i + 1}.png`;
          link.click();
        });
      } else {
        alert("Erro ao gerar imagem.");
      }
    } catch (err) {
      alert("Erro ao conectar com a API da OpenAI.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Gerador de Estampa com IA</h1>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Estilo da estampa</label>
          <input className="border rounded px-3 py-2 placeholder:text-gray-400 placeholder:opacity-50" value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="Ex: folhagem tropical, floral 3D" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Cores principais</label>
          <input className="border rounded px-3 py-2 placeholder:text-gray-400 placeholder:opacity-50" value={colors} onChange={(e) => setColors(e.target.value)} placeholder="Ex: pink, azul, verde-limão" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Cor de fundo</label>
          <input className="border rounded px-3 py-2 placeholder:text-gray-400 placeholder:opacity-50" value={background} onChange={(e) => setBackground(e.target.value)} placeholder="Ex: branco, teal, preto" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Tipo de peça</label>
          <input className="border rounded px-3 py-2 placeholder:text-gray-400 placeholder:opacity-50" value={useFor} onChange={(e) => setUseFor(e.target.value)} placeholder="Ex: maiô, bikini, saída de praia, chamise" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Harmonia de Cores</label>
          <select className="border rounded px-3 py-2" value={colorHarmony} onChange={(e) => setColorHarmony(e.target.value)}>
            <option value="nenhuma">Nenhuma (livre)</option>
            <option value="monocromática">Monocromática</option>
            <option value="análoga">Análoga</option>
            <option value="complementar">Complementar</option>
            <option value="tríade">Tríade</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Imagem de Referência (opcional)</label>
          <input type="file" accept="image/*" onChange={(e) => setReferenceImage(e.target.files[0])} />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4" onClick={generatePrompt}>
          Gerar imagem com IA
        </button>
        <div className="mt-4">
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {imageUrls.map((url, i) => (
              <div key={i} className="border rounded p-2">
                <img src={url} alt={`Estampa ${i + 1}`} className="w-full rounded mb-2" />
                <label className="block font-medium mb-1">Deseja alterar algum detalhe da estampa {i + 1}?</label>
                <input
                  className="border rounded px-3 py-2 w-full mb-2"
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                />
                <button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={async () => {
                    if (!editNote) return alert("Descreva a alteração desejada.");
                    const refinement = `${prompt} Faça a seguinte alteração: ${editNote}`;
                    const response = await fetch("https://api.openai.com/v1/images/generations", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
                      },
                      body: JSON.stringify({
                        prompt: refinement,
                        n: 1,
                        size: "1024x1024",
                        response_format: "url"
                      })
                    });
                    const data = await response.json();
                    const newUrl = data?.data?.[0]?.url;
                    if (newUrl) setImageUrls([newUrl]);
                    else alert("Erro ao refinar imagem.");
                  }}
                >
                  Refinar Estampa {i + 1}
                </button>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
