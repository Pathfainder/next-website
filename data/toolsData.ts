import { DevIconTypes } from "@/components/dev-icons"

export interface ToolsData {
  title: string
  description: string
  titleLink: string
  links: { title: string; href: string }[]
  icons?: DevIconTypes[]
}

const toolsData: ToolsData[] = [
  {
    title: "CR.ia",
    description: `Génère un compte rendu détaillé et de haute qualité sur n'importe quel sujet.`,
    titleLink: "http://localhost:3000/ai-tools/cr.ia/",
    links: [
      { title: "GitHub", href: "https://github.com/pathfainder" },
      { title: "Demo", href: "https://opening-lines.jamesshopland.cloud/" },
    ],
    icons: ["next", ],
  },

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
]

export default toolsData
