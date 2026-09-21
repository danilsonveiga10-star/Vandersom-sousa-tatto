import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Desligado só para o preview local: o Strict Mode do React corre os
  // efeitos duas vezes de propósito (só em "next dev"), e isso faz as
  // timelines do GSAP com ScrollTrigger "once: true" ficarem presas a
  // meio — texto com opacidade cheia mas ainda deslocado da posição
  // final. Confirmado que o build de produção (o site publicado) nunca
  // teve este problema: só acontece com o servidor de desenvolvimento.
  reactStrictMode: false,
};

export default nextConfig;
