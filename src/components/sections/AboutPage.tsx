import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { RoutePage } from "@/content/site";

type AboutPageProps = {
  page: RoutePage;
};

const experienceCards = [
  {
    number: "01",
    image: "/images/about-person-01.png",
    imageAlt: "Faceless illustrated executive holding a laptop",
    title: "Enterprise IT Leadership",
    text: "Leadership experience across banking technology, regulated delivery and executive decision environments."
  },
  {
    number: "02",
    image: "/images/about-person-02.png",
    imageAlt: "Faceless illustrated advisor holding a tablet",
    title: "Governance & Transformation",
    text: "Operating models, project structures and risk-aware delivery for organizations moving through change."
  },
  {
    number: "03",
    image: "/images/about-person-03.png",
    imageAlt: "Faceless illustrated consultant holding a tablet",
    title: "AI Advisory & Education",
    text: "Responsible AI adoption, executive learning and practical capability building for modern teams."
  }
];

export function AboutPage({ page }: AboutPageProps) {
  const [experience, ...sections] = page.sections;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#080c16] pb-16 pt-28 text-white lg:pb-24 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(200,169,107,0.24),transparent_26%),radial-gradient(circle_at_82%_72%,rgba(71,85,105,0.34),transparent_30%),linear-gradient(120deg,#080c16_0%,#111b2d_48%,#080c16_100%)]" />
        <div className="absolute inset-0 opacity-30">
          <AboutHeroPattern />
        </div>
        <div className="absolute left-[12%] top-24 h-2 w-2 rounded-full bg-gold shadow-[0_0_30px_8px_rgba(200,169,107,0.38)]" />
        <div className="absolute bottom-20 right-[15%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_24px_7px_rgba(255,255,255,0.18)]" />
        <div className="container-shell relative">
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                {page.hero.eyebrow}
              </p>
              <h1 className="font-display text-5xl leading-[0.98] text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.24)] md:text-6xl lg:text-7xl">
                {page.hero.title}
              </h1>
              <div className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {page.hero.text}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-shell">
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                {experience.eyebrow}
              </p>
              <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                Practical leadership for complex, regulated and knowledge-led environments.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-7 lg:grid-cols-3 lg:items-end">
            {experienceCards.map((card, index) => (
              <Reveal key={card.number} delay={80 + index * 70} className="h-full">
                <ExperiencePersonCard card={card} featured={index === 1} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={260}>
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
              {experience.bullets?.map((bullet) => (
                <div key={bullet} className="rounded-lg border border-slate-200 bg-porcelain p-4">
                  <Icon name="CheckCircle2" className="mb-3 h-4 w-4 text-gold" />
                  <p className="text-sm font-bold leading-6 text-slate-700">{bullet}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain py-16 lg:py-20">
        <div className="container-shell grid gap-6">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 80}>
              <article className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:grid-cols-[0.34fr_0.66fr]">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                    {section.eyebrow}
                  </p>
                  <h2 className="font-display text-3xl leading-[1.05] text-navy md:text-4xl">
                    {section.title}
                  </h2>
                </div>
                <div className="grid gap-5">
                  {section.body?.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-graphite md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <div className="grid gap-3 md:grid-cols-3">
                      {section.bullets.map((bullet) => (
                        <div key={bullet} className="rounded-lg border border-slate-200 bg-porcelain p-4">
                          <Icon name="CheckCircle2" className="mb-3 h-4 w-4 text-gold" />
                          <p className="text-sm font-bold leading-6 text-slate-700">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutHeroPattern() {
  return (
    <svg
      viewBox="0 0 1600 620"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aboutGoldLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8A96B" stopOpacity="0" />
          <stop offset="48%" stopColor="#C8A96B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C8A96B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M-80 470C210 310 355 555 620 350S1010 110 1280 290S1510 410 1680 210"
        fill="none"
        stroke="url(#aboutGoldLine)"
        strokeWidth="1.5"
      />
      <path
        d="M-20 190C240 30 470 210 720 120S1130 35 1630 180"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
      />
      <circle cx="250" cy="333" r="5" fill="#C8A96B" />
      <circle cx="620" cy="350" r="5" fill="#C8A96B" />
      <circle cx="1020" cy="190" r="5" fill="#C8A96B" />
      <circle cx="1390" cy="350" r="5" fill="#C8A96B" />
      <circle cx="250" cy="333" r="34" fill="none" stroke="rgba(200,169,107,0.22)" />
      <circle cx="1020" cy="190" r="48" fill="none" stroke="rgba(200,169,107,0.18)" />
      <path d="M130 80V540M470 30V590M820 0V620M1180 35V585M1500 80V540" stroke="rgba(255,255,255,0.055)" />
      <path d="M0 125H1600M0 310H1600M0 495H1600" stroke="rgba(255,255,255,0.05)" />
    </svg>
  );
}

function ExperiencePersonCard({
  card,
  featured = false
}: {
  card: (typeof experienceCards)[number];
  featured?: boolean;
}) {
  return (
    <div className={`flex h-full flex-col ${featured ? "lg:-mt-8" : "lg:pt-16"}`}>
      <div className="relative z-10 mx-auto mb-[-28px] h-[360px] w-[86%] max-w-[360px] overflow-hidden rounded-lg bg-[#f4f1e9] shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:h-[410px] lg:h-[440px]">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 50vw, 86vw"
          className="object-contain object-bottom"
        />
      </div>
      <article className="flex flex-1 flex-col rounded-lg border border-slate-200 bg-white p-5 pt-10 shadow-sm">
        <div className="mb-5 border-b border-slate-200 bg-gold/20 px-4 py-3 text-sm font-extrabold text-navy">
          {card.number}
        </div>
        <h3 className="font-display text-2xl leading-[1.08] text-navy">{card.title}</h3>
        <p className="mt-4 text-sm font-medium leading-7 text-slate-700">{card.text}</p>
      </article>
    </div>
  );
}
