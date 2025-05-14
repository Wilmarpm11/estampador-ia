
export function gerarPrompt({ estilo, cores, fundo }) {
  return `Crie uma estampa no estilo ${estilo}, com as cores ${cores} sobre fundo ${fundo}. A imagem deve ser tileável, de alta qualidade e adequada para impressão digital em tecido.`;
}
