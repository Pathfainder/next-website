import { DevIconTypes } from "@/components/dev-icons"

export interface ProjectData {
  title: string
  description: string
  titleLink: string
  links: { title: string; href: string }[]
  icons?: DevIconTypes[]
}

const projectsData: ProjectData[] = [
  {
    title: "Morphic",
    description:
      "Un moteur de recherche augmenté couplé à une IA générative qui permet de créer un flow de conversation de recherche. Un peu comme Perplexity, Morphic permet des recherche approffondies et propose des sources, liens, images et vidéos externes en temps réel. ",
    titleLink: "https://ai-search-engine-three.vercel.app/",
    links: [
      {
        title: "Docs",
        href: "https://github.com/Pathfainder/morphic/blob/main/README.md",
      },
      { title: "GitHub", href: "https://github.com/Pathfainder/morphic" },
    ],
    icons: ["next", "react", "tailwind", ],
  },
  {
    title: "Movie-web",
    description:
      "Un moteur de recherche de films et series, il effectue une recherche avancée sur les services de clouds disponibles pour tous, aucun contenu hébérgés",
    titleLink: "https://movie-web-ten-omega.vercel.app/",
    links: [
      {
        title: "GitHub",
        href: "https://github.com/Pathfainder/movie-web",
      },
    ],
    icons: ["next", ],
  },
  {
    title: "En cours..",
    description: `Soon !`,
    titleLink: "https://opening-lines.jamesshopland.cloud/",
    links: [
      { title: "GitHub", href: "https://github.com/jolbol1/opening-lines" },
      { title: "Demo", href: "https://opening-lines.jamesshopland.cloud/" },
    ],
    icons: ["next", ],
  },

  
]

export default projectsData
