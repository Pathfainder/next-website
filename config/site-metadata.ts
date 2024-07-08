// @ts-check

import { SiteConfig } from "config/config"

const siteMetadata: SiteConfig = {
  title: "Pathf(ai)nder",
  author: "Pathf(ai)nder",
  headerTitle: "Pathf(ai)nder",
  description:
    "Discover my personal website, where I showcase my coding skills and expertise in software engineering. Explore a range of innovative software tools, blog posts, and project showcases that demonstrate my passion for problem-solving and creativity in the rapidly changing field of technology.",
  language: "en-us",
  theme: "system", // system, dark or light
  siteUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  siteRepo: "https://github.com/jolbol1/JamesShopland.com",
  siteLogo: "/static/images/logo.png",
  image: "/static/images/avatar.png",
  socialBanner: "/static/images/twitter-card.png",
  email: "berchet.thomas@gmail.com",
  github: "https://github.com/Pathfainder",
  twitter: "https://twitter.com/pathfainder_",
  facebook: "https://facebook.com",
  youtube: "https://www.youtube.com/channel/UC0aH7XUFj9OOE7YGCoIXm3w",
  linkedin: "https://www.linkedin.com/in/thomas-berchet-107043300/",
  locale: "en-FR",
  giscusConfig: {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? "",
    repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID ?? "",
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "",
    mapping: "pathname",
    reactions: "1",
    metadata: "0",
    theme: "light",
    darkTheme: "transparent_dark",
    themeURL: "",
    lang: "fr",
  },
  kbarConfig: {
    searchDocumentsPath: "search.json",
  },
}

export default siteMetadata
