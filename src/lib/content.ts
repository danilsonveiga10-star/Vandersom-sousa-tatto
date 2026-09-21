export const STUDIO = {
  name: "Rato Tattoo",
  handle: "@ratotattoo_vanderson",
  instagramUrl: "https://www.instagram.com/ratotattoo_vanderson/",
  artist: "Vanderson",
  city: "Lisboa",
  country: "Portugal",
  neighbourhood: "",
  venue: "Atendimento particular",
  phoneDisplay: "",
  whatsappUrl: "https://wa.me/551166890570",
  whatsappNumber: "",
  coords: "Marcações por WhatsApp",
  specialties: ["Hiper-realismo", "Blackwork"],
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "#topo", index: "00" },
  { label: "Especialidades", href: "#especialidades", index: "01" },
  { label: "Trabalhos", href: "#trabalhos", index: "02" },
  { label: "Estúdio", href: "#estudio", index: "03" },
  { label: "O Artista", href: "#artista", index: "04" },
  { label: "Depoimentos", href: "#depoimentos", index: "05" },
  { label: "Agendar", href: "#agendar", index: "06" },
] as const;

export const TESTIMONIALS = [
  {
    id: "bruno",
    name: "Bruno T.",
    quote:
      "Levei uma foto de referência e o Vanderson devolveu um retrato que parece fotografia na pele. Sombra e luz batem certo de qualquer ângulo.",
  },
  {
    id: "carla",
    name: "Carla M.",
    quote:
      "Fechei a manga em preto e cinza com ele. Trabalho de precisão, sessões longas e sempre muito cuidado com a cicatrização.",
  },
  {
    id: "diego",
    name: "Diego F.",
    quote:
      "O leão hiper-realista que ele fez tem profundidade que eu nunca tinha visto num braço. Cada pelo parece desenhado a lápis.",
  },
  {
    id: "patricia",
    name: "Patrícia N.",
    quote:
      "Marquei workshop com ele e aprendi mais sobre sombreado em preto e cinza num fim de semana do que em meses sozinha.",
  },
  {
    id: "miguel",
    name: "Miguel S.",
    quote:
      "Cobertura de uma tatuagem antiga, virou um blackwork denso que escondeu tudo perfeitamente. Ninguém acredita que por baixo havia outra coisa.",
  },
  {
    id: "sara",
    name: "Sara L.",
    quote:
      "Marquei pelo WhatsApp, o orçamento foi claro do início ao fim e o resultado superou a referência que levei.",
  },
] as const;

export const INTEREST_OPTIONS = [
  "Hiper-realismo",
  "Blackwork",
  "Cover up",
  "Ainda não sei",
] as const;

export const TIME_SLOTS = ["10:00", "12:00", "14:00", "16:00", "18:00"] as const;

export const GALLERY_WORKS = [
  {
    id: "backpiece-anubis",
    src: "/videos/work-01.mp4",
    poster: "/images/posters/work-01.jpg",
    technique: "Blackwork",
    placement: "Costas",
    caption: "Costas fechadas com Anúbis e pirâmides, preto denso e hieróglifos em detalhe.",
  },
  {
    id: "pugs-braco",
    src: "/videos/work-02.mp4",
    poster: "/images/posters/work-02.jpg",
    technique: "Hiper-realismo",
    placement: "Braço",
    caption: "Retrato duplo de cães em preto e cinza, textura de pelo fio a fio.",
  },
  {
    id: "sessao-antebraco",
    src: "/videos/work-03.mp4",
    poster: "/images/posters/work-03.jpg",
    technique: "Hiper-realismo",
    placement: "Antebraço",
    caption: "Sessão ao vivo, retrato hiper-realista em construção no antebraço.",
  },
  {
    id: "catrina-manga",
    src: "/videos/work-04.mp4",
    poster: "/images/posters/work-04.jpg",
    technique: "Hiper-realismo",
    placement: "Braço",
    caption: "Manga fechada com Catrina e rosas, contraste profundo do ombro ao pulso.",
  },
  {
    id: "nossa-senhora",
    src: "/videos/work-05.mp4",
    poster: "/images/posters/work-05.jpg",
    technique: "Hiper-realismo",
    placement: "Braço",
    caption: "Manga religiosa com pomba e colunas, luz construída em camadas de cinza.",
  },
  {
    id: "aguia-antebraco",
    src: "/videos/work-06.mp4",
    poster: "/images/posters/work-06.jpg",
    technique: "Hiper-realismo",
    placement: "Antebraço",
    caption: "Águia em voo do cotovelo ao pulso, penas desenhadas em alto detalhe.",
  },
  {
    id: "joker-perna",
    src: "/videos/work-07.mp4",
    poster: "/images/posters/work-07.jpg",
    technique: "Blackwork",
    placement: "Perna",
    caption: "Palhaço em preto denso na perna, fumaça e sombra a devorar o fundo.",
  },
  {
    id: "leao-manga",
    src: "/videos/work-08.mp4",
    poster: "/images/posters/work-08.jpg",
    technique: "Hiper-realismo",
    placement: "Braço",
    caption: "Leão hiper-realista com lettering, manga fechada em preto e cinza.",
  },
] as const;

export const SPECIALTIES = [
  {
    index: "01",
    name: "Hiper-realismo",
    description:
      "Retrato que parece fotografia na pele. Luz e sombra construídas em camadas, até o traço desaparecer.",
    video: "/videos/work-08.mp4",
    poster: "/images/posters/work-08.jpg",
  },
  {
    index: "02",
    name: "Blackwork",
    description:
      "Preto denso, sem meio-tom para esconder erro. Peso que fecha a composição inteira.",
    video: "/videos/work-01.mp4",
    poster: "/images/posters/work-01.jpg",
  },
] as const;
