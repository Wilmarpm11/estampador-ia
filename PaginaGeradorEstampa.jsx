import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [resultado, setResultado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setResultado(`Você digitou: ${prompt}`);
    // Aqui você pode colocar a chamada para sua API de geração de estampa
  };

  return (
    <main style={{ padding: 32 }}>
      <h1>Estampador IA</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descreva sua estampa..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: 300, padding: 8, marginRight: 8 }}
        />
        <button type="submit">Gerar Estampa</button>
      </form>
      {resultado && <p style={{ marginTop: 24 }}>{resultado}</p>}
    </main>
  );
}
