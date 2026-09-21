# Site do Rato Tattoo (Vanderson Sousa)

Cópia do código real do projeto Isa Tattoo
(`C:\Users\Utilizador\OneDrive\Ambiente de Trabalho\Isa Tatto`),
com toda a informação, textos e fotos trocados pelos do Vanderson
(@ratotattoo_vanderson). Estrutura, tipografia, cores, distorção WebGL do
hero e todas as animações GSAP são as mesmas do projeto original — o
conteúdo mudou, e as fotos de trabalhos viraram vídeos (o Vanderson só
tinha vídeo dos trabalhos, não fotos — as únicas fotos reais são retratos
dele mesmo, usadas na secção "O Artista").

## Correr localmente

```bash
npm install
npm run dev
```

Abre o endereço que o terminal indicar (normalmente http://localhost:3000,
ou outra porta se a 3000 estiver ocupada por outro projeto teu).

## Publicar

Pronto para deploy na Vercel: liga esta pasta à Vercel (`vercel` via CLI, ou
importa no painel) e publica — não precisa de configuração adicional.

## O que ainda precisa de atenção antes de publicar

- **Depoimentos** (`src/components/Testimonials.tsx` / `src/lib/content.ts`):
  ficaram como placeholders, marcados "Exemplo de pré-visualização". Substitui
  pelos depoimentos reais assim que o Vanderson tiver.
- **Link de agendamento**: o botão "Agendar" e o formulário usam
  `https://wa.me/551166890570`. Confirma que o número está certo e ativo
  antes de publicar.
- **Cidade**: o site assume Lisboa, Portugal, com base na bio do Instagram
  (@ratotattoo_vanderson). Confirma com o Vanderson se ele atende noutro
  sítio também.
- **Vídeos**: estão em `public/videos/`, escolhidos a partir da pasta
  `Imagens/` que deixaste (clipes exportados do Instagram via SaveClip). As
  legendas/técnica de cada trabalho em `src/lib/content.ts` foram escritas a
  partir de um frame de cada vídeo — confirma com o Vanderson se a técnica e
  o local do corpo estão certos.
- **Retrato**: `public/images/artist-portrait.jpg` é uma das duas fotos reais
  que deixaste (`Imagens/IMG_9596.jpeg`).

## Estrutura

- `src/app/page.tsx` — ordem das secções
- `src/components/` — uma secção por ficheiro (Loader, Nav, HeroDistortion,
  Manifesto, Specialties, Gallery, Studio, About, Testimonials, BookingForm,
  Booking, Footer)
- `src/lib/content.ts` — todo o conteúdo (nome, WhatsApp, Instagram,
  especialidades, trabalhos, depoimentos) num único sítio
- `public/videos/work-01.mp4` … `work-08.mp4` — os 8 clipes de trabalhos
- `public/images/posters/` — um frame extraído de cada vídeo, usado como
  poster/thumbnail antes do vídeo carregar
