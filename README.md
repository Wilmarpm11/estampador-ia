
# Estampador com IA – Versão Final

Este projeto é um gerador de estampas com inteligência artificial utilizando Next.js, OpenAI (DALL·E) e integração com BigJPG para geração em alta resolução.

---

## 🛠️ Instalação

```bash
git clone https://github.com/Wilmarpm11/estampador-ia.git
cd estampador-ia
npm install
```

---

## 🚀 Rodando o Projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Variáveis de Ambiente

Crie o arquivo `.env.local` com as seguintes chaves:

```env
NEXT_PUBLIC_OPENAI_API_KEY=sua-chave-openai-aqui
NEXT_PUBLIC_BIGJPG_API_KEY=sua-chave-bigjpg-aqui
```

---

## 📐 Especificação da Estampa para Impressão Digital

| Item               | Valor                          |
|--------------------|--------------------------------|
| Tamanho físico     | 50x50 cm                       |
| Resolução          | 300 DPI                        |
| Dimensão final     | 5906 x 5906 px (via upscale)   |
| Formato            | JPG tileável                   |
| Cor                | CMYK (simulado no RGB)         |
| Aparência          | Realista, natural, sem colagens |

---

## 🧠 Tecnologias Usadas

- Next.js (React)
- OpenAI API (DALL·E)
- BigJPG API (upscale de imagem)
- JavaScript (Front-end)
- Vercel (Deploy)

---

## 💡 Futuras Melhorias

- Exportação real em PSD com camadas
- Integração nativa com topaz / letsenhance
- Modo galeria para histórico de estampas
