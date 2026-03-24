import { motion } from "framer-motion";
import infoRaw from "../Info.txt?raw";

type PlanItem = {
  name: string;
  summary: string;
  idealFor: string;
  focus: string[];
  includes: string[];
  result: string;
};

type Content = {
  company: string;
  tagline: string;
  links: {
    primary: string;
    whatsapp: string;
  };
  nav: { id: string; label: string }[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    points: string[];
  };
  problem: {
    eyebrow: string;
    title: string;
    description: string;
    painPoints: string[];
    conclusion: string;
  };
  whatWeDo: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  plans: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: PlanItem[];
  };
  industries: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    secondaryCta: string;
  };
  images: {
    hero: string;
  };
};

const parseContent = (raw: string): Content => {
  try {
    const normalized = raw.replace(/^\uFEFF/, "").trim();
    return JSON.parse(normalized) as Content;
  } catch {
    return {
      company: "TwoCan Studios",
      tagline: "Automatización inteligente para atención, reservas y operación",
      links: {
        primary: "https://wa.me/522217592335",
        whatsapp: "https://wa.me/522217592335",
      },
      nav: [],
      hero: {
        eyebrow: "TwoCan Studios",
        title: "Automatización inteligente para atención, reservas y operación",
        subtitle:
          "Ayudamos a negocios a responder más rápido, convertir más oportunidades y operar con más orden.",
        points: ["Respuestas en minutos, no horas", "Seguimiento que no se pierde", "Operación diaria más ordenada"],
      },
      problem: {
        eyebrow: "El problema",
        title: "Muchos negocios crecen antes de tener procesos claros",
        description:
          "Mensajes sin responder, leads que se enfrían, tareas operativas desordenadas y equipos resolviendo todo manualmente.",
        painPoints: [],
        conclusion: "",
      },
      whatWeDo: {
        eyebrow: "Qué hacemos",
        title: "Diseñamos sistemas para responder, convertir y operar mejor",
        description:
          "No se trata de quitar lo humano del servicio. Se trata de que el negocio funcione con más claridad, velocidad y consistencia.",
        items: [],
      },
      plans: {
        eyebrow: "Programas",
        title: "Soluciones diseñadas para crecer con tu negocio",
        subtitle: "",
        items: [],
      },
      industries: {
        eyebrow: "Industrias",
        title: "Ideal para negocios con atención y coordinación diaria",
        description: "",
        items: [],
      },
      benefits: {
        eyebrow: "Beneficios",
        title: "Lo que cambia cuando el sistema está bien diseñado",
        subtitle: "",
        items: [],
      },
      finalCta: {
        eyebrow: "Siguiente paso",
        title: "Tu negocio no necesita más caos. Necesita un sistema mejor.",
        description: "Hablemos sobre qué tipo de automatización tendría más impacto en tu operación hoy.",
        points: [],
        secondaryCta: "Escribir por WhatsApp",
      },
      images: {
        hero: "/assets/hero.png",
      },
    };
  }
};

const content = parseContent(infoRaw);
const featuredPlans = content.plans.items.slice(0, 3);

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9] },
};

const heroTextStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const heroTextItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

function SmallDot() {
  return <span className="dot" aria-hidden="true" />;
}

function BigIcon({ kind }: { kind: "lead" | "reserve" | "operate" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (kind === "lead") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M4 5h16v10H8l-4 4V5z" />
        <path {...common} d="M8 9h8M8 12h5" />
      </svg>
    );
  }

  if (kind === "reserve") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M7 4v3M17 4v3M4 9h16" />
        <path {...common} d="M5 6h14v14H5z" />
        <path {...common} d="m9 14 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...common} d="M4 7h7v4H4zM13 13h7v4h-7zM11 9h2v6h-2z" />
      <path {...common} d="M18 7h2M4 17h2" />
    </svg>
  );
}

type RowIconType = "delay" | "followup" | "disorder" | "speed" | "capture" | "organize" | "audit" | "loss" | "roadmap";

function RowIcon({ type }: { type: RowIconType }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "item-icon",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (type === "delay") return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></svg>;
  if (type === "followup") return <svg {...common}><path d="M7 4v3M17 4v3M4 9h16" /><path d="M5 6h14v14H5z" /><path d="m9 14 2 2 4-4" /></svg>;
  if (type === "disorder") return <svg {...common}><path d="M4 7h7v4H4zM13 13h7v4h-7zM11 9h2v6h-2z" /></svg>;
  if (type === "speed") return <svg {...common}><path d="M3 12h8m2-4h8M5 16h10" /></svg>;
  if (type === "capture") return <svg {...common}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="3" /></svg>;
  if (type === "organize") return <svg {...common}><path d="M4 6h7v4H4zM13 6h7v4h-7zM4 14h7v4H4zM13 14h7v4h-7z" /></svg>;
  if (type === "audit") return <svg {...common}><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>;
  if (type === "loss") return <svg {...common}><path d="M4 6h16v12H4z" /><path d="M7 15l3-3 2 2 5-5" /></svg>;
  return <svg {...common}><path d="M4 18h16M6 16l4-4 3 3 5-6" /></svg>;
}

const iconByIndex: Array<"lead" | "reserve" | "operate"> = ["lead", "reserve", "operate"];

const problemRows = [
  { icon: "delay" as const, text: "Respuestas tardías que enfrían oportunidades" },
  { icon: "followup" as const, text: "Seguimiento irregular en reservas o ventas" },
  { icon: "disorder" as const, text: "Desorden entre atención y operación" },
];

const solutionRows = [
  { icon: "speed" as const, text: "responder más rápido" },
  { icon: "capture" as const, text: "capturar mejor cada oportunidad" },
  { icon: "organize" as const, text: "ordenar leads, tareas y procesos internos" },
];

const nextStepRows = [
  { icon: "audit" as const, text: "Revisamos tu flujo actual de atención" },
  { icon: "loss" as const, text: "Identificamos dónde se están perdiendo oportunidades" },
  { icon: "roadmap" as const, text: "Definimos el siguiente paso con mayor impacto" },
];

export default function App() {
  return (
    <div className="site-shell">
      <header className="topbar-wrap">
        <div className="container topbar">
          <a className="brand" href="#inicio">{content.company}</a>
          <nav className="nav" aria-label="Principal">
            <a href="#problema">Problema</a>
            <a href="#programas">Programas</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a className="btn btn-nav-primary" href={content.links.whatsapp} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
        </div>
      </header>

      <main id="inicio">
        <section className="section hero-section">
          <div className="container hero-grid">
            <motion.div variants={heroTextStagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
              <motion.p className="eyebrow" variants={heroTextItem}>{content.hero.eyebrow}</motion.p>
              <motion.h1 variants={heroTextItem}>{content.hero.title}</motion.h1>
              <motion.p className="subtitle" variants={heroTextItem}>
                Ayudamos a negocios con atención diaria por WhatsApp a automatizar respuestas, reservas y seguimiento
                para vender y operar con más claridad.
              </motion.p>
              <motion.div className="cta-row" variants={heroTextItem}>
                <a className="btn btn-primary" href={content.links.whatsapp} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
                <a className="btn btn-secondary" href="#programas">Ver programas</a>
              </motion.div>
              <motion.div className="hero-points hero-points-strong" variants={heroTextStagger}>
                {content.hero.points.map((point) => (
                  <motion.article key={point} variants={heroTextItem}>
                    <SmallDot />
                    <p>{point}</p>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>

            <motion.figure className="hero-media" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
              <img src={content.images.hero} alt="Equipo coordinando operaciones y atención al cliente" loading="eager" />
            </motion.figure>
          </div>
        </section>

        <section id="problema" className="section problem-section">
          <div className="container split-layout">
            <motion.article className="panel panel-problem" {...reveal}>
              <p className="section-label">{content.problem.eyebrow}</p>
              <h2>{content.problem.title}</h2>
              <p>{content.problem.description}</p>
              <ul className="list-pain">
                {problemRows.map((item) => (
                  <li key={item.text}>
                    <RowIcon type={item.icon} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article className="panel panel-solution" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
              <p className="section-label">{content.whatWeDo.eyebrow}</p>
              <h2>{content.whatWeDo.title}</h2>
              <p>{content.whatWeDo.description}</p>
              <ul className="list-pain list-solution">
                {solutionRows.map((item) => (
                  <li key={item.text}>
                    <RowIcon type={item.icon} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </section>

        <section id="programas" className="section programs-section">
          <div className="container section-head">
            <motion.p className="eyebrow" {...reveal}>{content.plans.eyebrow}</motion.p>
            <motion.h2 {...reveal}>{content.plans.title}</motion.h2>
            <motion.p className="section-subtitle" {...reveal}>{content.plans.subtitle}</motion.p>
          </div>

          <div className="container program-grid">
            {featuredPlans.map((plan, index) => (
              <motion.article key={plan.name} className="program-card" {...reveal} transition={{ ...reveal.transition, delay: index * 0.05 }}>
                <BigIcon kind={iconByIndex[index]} />
                <p className="program-title">{plan.name}</p>
                <p className="program-description">{plan.summary}</p>
                <p className="mini-label">Ideal para</p>
                <p className="mini-text">{plan.idealFor}</p>
                <p className="mini-label">Resultado</p>
                <p className="program-result">{plan.result}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contacto" className="section cta-section">
          <motion.div className="container cta-shell" {...reveal}>
            <p className="eyebrow">{content.finalCta.eyebrow}</p>
            <h2>{content.finalCta.title}</h2>
            <p className="cta-text">{content.finalCta.description}</p>
            <ul className="cta-list">
              {nextStepRows.map((item) => (
                <li key={item.text}>
                  <RowIcon type={item.icon} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <a className="btn btn-primary" href={content.links.whatsapp} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-row">
          <p>{content.company}</p>
          <p>{content.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
