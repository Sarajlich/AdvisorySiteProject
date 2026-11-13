import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { Industry, RoutePage, Service } from "@/content/site";

type IndustryDetailPageProps = {
  page: RoutePage;
  industry: Industry;
  services: Service[];
};

const sectorProfiles: Record<
  string,
  {
    signal: string;
    thesis: string;
    operatingFocus: string[];
    outcomes: string[];
    accent: string;
    pattern: string;
  }
> = {
  "banking-financial-services": {
    signal: "Regulated trust environment",
    thesis:
      "Banking work needs governance that can stand up to risk review, audit evidence and executive scrutiny while still allowing transformation to move.",
    operatingFocus: ["Control evidence", "DORA resilience", "AI accountability"],
    outcomes: [
      "Stronger decision records for transformation portfolios",
      "Clearer connection between technology delivery, risk and compliance",
      "Practical AI governance for regulated products and operations"
    ],
    accent: "from-gold/35 via-white/10 to-transparent",
    pattern: "grid"
  },
  "government-public-sector": {
    signal: "Public accountability environment",
    thesis:
      "Public-sector transformation needs continuity, transparent decisions and stakeholder alignment that survives leadership, policy and budget changes.",
    operatingFocus: ["Public value", "Program continuity", "Stakeholder clarity"],
    outcomes: [
      "Governance structures that make responsibilities visible",
      "Delivery rhythms suited to institutional decision cycles",
      "Modernization plans that balance service quality and accountability"
    ],
    accent: "from-sky-300/25 via-white/10 to-transparent",
    pattern: "civic"
  },
  "it-software": {
    signal: "Product and platform environment",
    thesis:
      "Technology teams need enough governance to prioritize, ship and scale without burying product decisions under process noise.",
    operatingFocus: ["Portfolio flow", "Product alignment", "Engineering adoption"],
    outcomes: [
      "Sharper prioritization across products, platforms and initiatives",
      "Operating models that connect leadership intent to delivery teams",
      "Responsible AI adoption patterns for engineering and product groups"
    ],
    accent: "from-emerald-300/25 via-white/10 to-transparent",
    pattern: "circuit"
  },
  "infrastructure-utilities": {
    signal: "Long-cycle delivery environment",
    thesis:
      "Infrastructure and utilities programs need dependency control, vendor clarity and risk discipline across long timelines and operational constraints.",
    operatingFocus: ["Dependencies", "Vendor rhythm", "Operational risk"],
    outcomes: [
      "Program governance that exposes delivery constraints early",
      "Dependency maps that support executive trade-off decisions",
      "Risk and stakeholder cadence for complex implementation environments"
    ],
    accent: "from-amber-400/25 via-white/10 to-transparent",
    pattern: "route"
  },
  education: {
    signal: "Capability-building environment",
    thesis:
      "Education work turns governance, AI and project leadership into practical learning paths that professionals can use in real decisions.",
    operatingFocus: ["Curriculum", "Workshops", "Executive learning"],
    outcomes: [
      "Learning formats connected to actual governance and delivery challenges",
      "AI and PM education that supports confident adoption",
      "Mentoring and workshops shaped for leaders, teams and institutions"
    ],
    accent: "from-fuchsia-300/20 via-white/10 to-transparent",
    pattern: "learning"
  }
};

export function IndustryDetailPage({ page, industry, services }: IndustryDetailPageProps) {
  const profile = sectorProfiles[industry.slug] || sectorProfiles.education;
  const relevantServices = services.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-[#080b12] pb-16 pt-28 text-white lg:pb-20 lg:pt-32">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(200,169,107,0.22),transparent_24%),linear-gradient(115deg,rgba(8,11,18,1),rgba(15,23,42,0.88),rgba(8,11,18,1))]`} />
        <div className={`absolute inset-x-0 top-0 h-full bg-gradient-to-br ${profile.accent}`} />
        <div className="absolute inset-0 opacity-25">
          <SectorPattern variant={profile.pattern} />
        </div>
        <div className="container-shell relative">
          <Reveal>
            <Link
              href="/industries"
              className="mb-10 inline-flex items-center gap-2 text-sm font-extrabold text-slate-300 transition hover:text-gold"
            >
              <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
              Industries
            </Link>
            <div className="grid gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  {page.hero.eyebrow}
                </p>
                <h1 className="max-w-5xl font-display text-5xl leading-[0.96] md:text-6xl lg:text-7xl">
                  {page.hero.title}
                </h1>
              </div>
              <div className="border-l border-gold/45 pl-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
                  {profile.signal}
                </p>
                <p className="mt-5 text-lg leading-8 text-slate-200">{page.hero.text}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  Sector Thesis
                </p>
                <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                  Advisory shaped around how this sector really moves.
                </h2>
              </div>
              <div>
                <p className="text-2xl font-semibold leading-10 text-navy">{profile.thesis}</p>
                <div className="mt-10 grid gap-0 border-y border-slate-200">
                  {profile.operatingFocus.map((item) => (
                    <div key={item} className="flex items-center justify-between gap-6 border-b border-slate-200 py-5 last:border-b-0">
                      <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">
                        Focus
                      </span>
                      <span className="text-right font-display text-2xl text-navy">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f7f8f9] py-16 lg:py-24">
        <div className="container-shell">
          <div className="grid gap-6 lg:grid-cols-[0.43fr_0.57fr] lg:items-stretch">
            <Reveal className="h-full">
              <div className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:p-10 lg:min-h-0">
                <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${profile.accent}`} />
                <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full border border-gold/20" />
                <div className="absolute -bottom-16 -right-12 h-48 w-48 rounded-full border border-gold/20" />
                <div className="absolute bottom-10 right-10 grid h-14 w-14 place-items-center rounded-full bg-navy text-gold shadow-[0_18px_40px_rgba(15,23,42,0.22)]">
                  <Icon name={industry.icon} className="h-6 w-6" />
                </div>
                <div className="relative">
                  <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                    Priorities
                  </p>
                  <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                    What gets clarified first.
                  </h2>
                  <div className="mt-10 border-t border-slate-200 pt-7">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
                      Decision lens
                    </span>
                    <div className="mt-6 grid gap-4">
                      {profile.operatingFocus.map((focus, index) => (
                        <div key={focus} className="flex items-center gap-3">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-xs font-extrabold text-[#9b7838]">
                            0{index + 1}
                          </span>
                          <span className="text-[15px] font-extrabold text-navy">{focus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="relative mt-auto max-w-[16rem] pt-16 text-sm font-medium leading-7 text-slate-500">
                  Three clear decisions create the foundation for focused, accountable progress.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-4">
              {industry.priorities.map((priority, index) => (
                <Reveal key={priority} delay={index * 70}>
                  <div className="group relative grid gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:bg-[#fffdf8] hover:shadow-[0_24px_65px_rgba(15,23,42,0.13)] md:grid-cols-[0.2fr_0.8fr] md:p-8">
                    <span className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-gold transition duration-500 group-hover:scale-y-100" />
                    <span className="font-display text-4xl text-gold transition duration-500 group-hover:translate-x-1 group-hover:text-[#a67e35]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl leading-[1.04] text-navy transition duration-500 group-hover:translate-x-1">{priority}</h3>
                      <p className="mt-4 text-base leading-8 text-graphite">
                        {profile.outcomes[index] || profile.outcomes[0]}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-gold opacity-0 transition duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                        Clarify the approach
                        <Icon name="ArrowRight" className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-shell">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-stretch">
              <div className="relative flex h-full min-h-[580px] flex-col overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-[0_28px_80px_rgba(15,23,42,0.2)] md:p-10 lg:min-h-0">
                <div className="absolute inset-0 opacity-20">
                  <SectorPattern variant={profile.pattern} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/30 to-navy" />
                <div className="relative">
                  <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                    Service Fit
                  </p>
                  <h2 className="font-display text-4xl leading-[1.02] text-white md:text-5xl">
                    How support usually enters.
                  </h2>
                  <div className="mt-9 border-t border-white/15 pt-7">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold">
                          Flexible by design
                        </p>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                          Start with one focused decision, then scale support only where the work calls for it.
                        </p>
                      </div>
                      <span className="font-display text-5xl text-white/15">04</span>
                    </div>
                  </div>
                </div>
                <Link href="/book" className="relative mt-auto inline-flex w-fit items-center gap-2 border-b border-gold/40 pb-2 pt-14 text-sm font-extrabold text-gold transition hover:gap-3 hover:border-white hover:text-white">
                  Discuss the right entry point
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4">
                {relevantServices.map((service, index) => (
                  <Link
                    href="/services"
                    key={service.slug}
                    className="group relative grid gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:bg-gradient-to-r hover:from-gold/10 hover:via-white hover:to-white hover:shadow-[0_24px_65px_rgba(15,23,42,0.13)] md:grid-cols-[0.34fr_0.66fr] md:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-navy transition duration-500 group-hover:rotate-[-4deg] group-hover:border-gold group-hover:bg-gold group-hover:shadow-[0_10px_25px_rgba(200,169,107,0.3)]">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">0{index + 1}</span>
                        <h3 className="mt-2 font-display text-2xl leading-[1.05] text-navy md:text-3xl">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <p className="text-base font-medium leading-8 text-graphite">{service.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-gold transition duration-500 group-hover:gap-3 group-hover:text-navy">
                        Explore service
                        <Icon name="ArrowRight" className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SectorPattern({ variant }: { variant: string }) {
  if (variant === "civic") {
    return (
      <svg viewBox="0 0 1200 520" className="h-full w-full" preserveAspectRatio="none">
        <path d="M40 420H1160M120 360H1080M210 300H990M300 240H900" stroke="white" strokeWidth="1" />
        <path d="M180 420V210M360 420V160M540 420V120M720 420V160M900 420V210" stroke="#C8A96B" strokeWidth="1" />
      </svg>
    );
  }

  if (variant === "circuit") {
    return (
      <svg viewBox="0 0 1200 520" className="h-full w-full" preserveAspectRatio="none">
        <path d="M70 120H330V260H610V150H980" fill="none" stroke="#C8A96B" strokeWidth="1" />
        <path d="M210 390H470V310H760V405H1120" fill="none" stroke="white" strokeWidth="1" />
        {[330, 610, 760, 980].map((x) => (
          <circle key={x} cx={x} cy={x === 760 ? 310 : 150} r="7" fill="#C8A96B" />
        ))}
      </svg>
    );
  }

  if (variant === "route") {
    return (
      <svg viewBox="0 0 1200 520" className="h-full w-full" preserveAspectRatio="none">
        <path d="M40 390C220 270 300 470 470 310S710 150 860 250S1020 390 1160 210" fill="none" stroke="#C8A96B" strokeWidth="2" />
        <path d="M90 280C270 190 420 280 560 170S850 80 1110 150" fill="none" stroke="white" strokeWidth="1" />
      </svg>
    );
  }

  if (variant === "learning") {
    return (
      <svg viewBox="0 0 1200 520" className="h-full w-full" preserveAspectRatio="none">
        <path d="M90 120H430M90 190H510M90 260H380M710 120H1110M650 190H1040M760 260H1120" stroke="white" strokeWidth="1" />
        <path d="M520 390C610 320 720 320 820 390C720 450 610 450 520 390Z" fill="none" stroke="#C8A96B" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1200 520" className="h-full w-full" preserveAspectRatio="none">
      <path d="M0 120H1200M0 260H1200M0 400H1200M220 0V520M520 0V520M820 0V520" stroke="white" strokeWidth="1" />
      <path d="M120 420L360 260L540 310L780 150L1080 240" fill="none" stroke="#C8A96B" strokeWidth="2" />
    </svg>
  );
}
