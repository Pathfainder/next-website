import Image from "next/image"
import Link from "next/link"

import hero from "@/public/images/general/hero-image.webp"

import siteMetadata from "@/config/site-metadata"

import Youtube from "@/components/social-icons/youtube.svg"

export function Header() {
  return (
    <section className="relative ">
      <div className="mx-auto mb-24 grid h-auto max-w-7xl auto-rows-min grid-cols-4 gap-x-4 pt-0 md:grid-cols-8 lg:relative lg:mb-64 lg:min-h-[40rem] lg:grid-cols-12 lg:gap-x-6 lg:pb-12 lg:pt-24">
        <div className="col-span-full pt-6 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col">
          <h1 className="typing-demo mb-4 max-w-2xl text-3xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
            Bienvenue à toi !
          </h1>
          <p className="mb-6 max-w-2xl  text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Consultant et spécialiste en Intelligence Artificielle. 
            Conception de solutions d'automatisation géré par l'IA.
            Dévellopeur d'applications IA.
          </p>
          <div className="flex w-full">
            <Link
              href="/blog"
              className="mr-3 inline-flex items-center justify-center rounded-lg bg-purple-950 px-5 py-3 text-center text-base font-medium text-white hover:bg-purple-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Le blog
            </Link>
            <Link
              href={siteMetadata.youtube}
              aria-label=""
              target="_blank"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-[#FF0000] bg-[#FF0000] px-5 py-3 text-center text-base font-medium text-white hover:bg-[#FF0000]/80  focus:ring-4 focus:ring-gray-100  dark:text-white  dark:focus:ring-gray-800"
            >
              <Youtube aria-hidden className="size-4 fill-current " />
              <span aria-hidden className="before:content-['YouTube'] sm:group-hover:before:content-['Abonnez-vous !']"></span>
              <span className="sr-only">Contact</span>
            </Link>
          </div>
        </div>
        <div className="col-span-full mb-12 flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:-mt-24 lg:mb-0 lg:mr-[-5vw] lg:px-0">
          <div className="relative w-full">
            <Image
              src={hero}
              quality={50}
              alt={
                "avatar of Thomas berchet in a space suit, generated with stable diffusion"
              }
              priority
              className="max-h-[50vh] w-full object-contain lg:max-h-[75vh]"
              sizes="(max-width: 1024px) 60vw,
              100vw"
            />

            <div className="absolute bottom-0 h-12 w-full bg-gradient-to-t from-white to-transparent dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
