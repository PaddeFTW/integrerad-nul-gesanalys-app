export const siteConfig = {
  name: "Integrerad nulägesanalys",
  shortName: "Nuläge",
  description:
    "Gemensam nulägesanalys för kvalitets- och miljöledning enligt ISO 9001 och ISO 14001.",
  links: {
    repository: "https://github.com/PaddeFTW/integrerad-nul-gesanalys-app",
    template: "https://github.com/PaddeFTW/app-template",
  },
  docs: [
    {
      title: "Kravspecifikation",
      href: "/docs/01_KRAVSPECIFIKATION.md",
      description: "Vision, IA, datamodell och acceptanskriterier.",
    },
    {
      title: "Produktionsprompt",
      href: "/docs/02_PRODUKTIONSPROMPT.md",
      description: "Prompt för Cursor / v0.",
    },
    {
      title: "Plan",
      href: "/docs/03_PLAN.md",
      description: "Byggordning v0 till v1.",
    },
    {
      title: "Startprompt",
      href: "/docs/04_STARTPROMPT.md",
      description: "Första meddelandet i Cursor.",
    },
  ],
} as const;
