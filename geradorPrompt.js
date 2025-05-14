
export function gerarPrompt({ estilo, cores, fundo }) {
  return `Crie uma estampa digital tileável com alta resolução (300 DPI), adequada para impressão em tecido de poliéster no tamanho 50x50 cm. 
  A composição deve incluir elementos naturais como ${estilo}, com cores ${cores} e fundo ${fundo}. 
  Os elementos devem ter aparência realista, evitar estilo artificial ou colagens digitais, e estar visualmente separados com boa definição. 
  O padrão de cores deve simular CMYK para resultados de impressão profissional.`;
}
