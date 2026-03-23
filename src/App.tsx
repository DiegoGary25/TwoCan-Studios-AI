import { motion } from "framer-motion";
import infoRaw from "../Info.txt?raw";

type ParsedContent = {
  companyName: string;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  sections: { id: string; title: string; body: string[] }[];
};

const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const parseInfo = (raw: string): ParsedContent => {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return {
      companyName: "Your Company",
      headline: "A modern studio website, ready for your real business content.",
      subheadline:
        "This build is intentionally minimal because Info.txt is empty. Add your approved copy there and the page structure is ready to scale.",
      ctaPrimary: "Book a Call",
      ctaSecondary: "View Services",
      sections: [
        {
          id: "services",
          title: "Services",
          body: [
            "Add service descriptions in Info.txt to replace this placeholder.",
            "Keep each service clear, outcome-focused, and tied to buyer value.",
          ],
        },
        {
          id: "approach",
          title: "Approach",
          body: [
            "Define your process, typical project timeline, and what collaboration looks like.",
          ],
        },
        {
          id: "contact",
          title: "Contact",
          body: [
            "Add your preferred contact method, location, and response expectations.",
          ],
        },
      ],
    };
  }

  const lines = normalized.split("\n").map((line) => line.trim());
  const keyValue = new Map<string, string>();
  const sections: { id: string; title: string; body: string[] }[] = [];

  let currentSection: { id: string; title: string; body: string[] } | null = null;

  for (const line of lines) {
    if (!line) {
      continue;
    }

    const headingMatch = line.match(/^##?\s+(.+)$/);
    if (headingMatch) {
      currentSection = {
        id: toId(headingMatch[1]),
        title: headingMatch[1],
        body: [],
      };
      sections.push(currentSection);
      continue;
    }

    const kvMatch = line.match(/^([^:]+):\s*(.+)$/);
    if (kvMatch && !currentSection) {
      keyValue.set(kvMatch[1].trim().toLowerCase(), kvMatch[2].trim());
      continue;
    }

    if (!currentSection) {
      currentSection = { id: "overview", title: "Overview", body: [] };
      sections.push(currentSection);
    }

    currentSection.body.push(line.replace(/^[-*]\s*/, ""));
  }

  const companyName =
    keyValue.get("company") ?? keyValue.get("company name") ?? sections[0]?.title ?? "Your Company";
  const headline =
    keyValue.get("headline") ??
    keyValue.get("hero") ??
    sections[0]?.body[0] ??
    "A premium partner for focused, high-quality outcomes.";
  const subheadline =
    keyValue.get("subheadline") ??
    keyValue.get("summary") ??
    sections[0]?.body[1] ??
    "Built for clarity, trust, and conversion across desktop and mobile.";

  return {
    companyName,
    headline,
    subheadline,
    ctaPrimary: keyValue.get("primary cta") ?? keyValue.get("cta") ?? "Start a Project",
    ctaSecondary: keyValue.get("secondary cta") ?? "Explore Services",
    sections,
  };
};

const content = parseInfo(infoRaw);

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
};

export default function App() {
  return (
    <div className="site-shell">
      <div className="bg-orb bg-orb-a" />
      <div className="bg-orb bg-orb-b" />

      <header className="topbar">
        <a className="brand" href="#top">
          {content.companyName}
        </a>
        <nav className="nav-links">
          {content.sections.slice(0, 4).map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
        <a className="btn btn-ghost" href="#contact">
          Contact
        </a>
      </header>

      <main id="top">
        <section className="hero container">
          <motion.p className="eyebrow" {...fadeUp}>
            Premium Service Studio
          </motion.p>
          <motion.h1 {...fadeUp}>{content.headline}</motion.h1>
          <motion.p className="hero-sub" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
            {content.subheadline}
          </motion.p>
          <motion.div className="hero-actions" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <a className="btn btn-solid" href="#contact">
              {content.ctaPrimary}
            </a>
            <a className="btn btn-outline" href={`#${content.sections[0]?.id ?? "services"}`}>
              {content.ctaSecondary}
            </a>
          </motion.div>
        </section>

        <section className="container metrics" aria-label="Highlights">
          <article>
            <p className="metric-label">Delivery Style</p>
            <p className="metric-value">Hands-on & strategic</p>
          </article>
          <article>
            <p className="metric-label">Focus</p>
            <p className="metric-value">Clarity, quality, outcomes</p>
          </article>
          <article>
            <p className="metric-label">Experience</p>
            <p className="metric-value">Designed for trust</p>
          </article>
        </section>

        <section className="container sections-grid">
          {content.sections.map((section, index) => (
            <motion.article
              key={section.id}
              id={section.id}
              className="content-card"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.04 }}
            >
              <h2>{section.title}</h2>
              {section.body.length > 0 ? (
                section.body.map((line) => <p key={`${section.id}-${line}`}>{line}</p>)
              ) : (
                <p>Add content for this section in Info.txt.</p>
              )}
            </motion.article>
          ))}
        </section>

        <section id="contact" className="container cta-band">
          <motion.div {...fadeUp}>
            <p className="eyebrow">Ready to move forward</p>
            <h2>Let&apos;s build your next phase with focus and precision.</h2>
            <p>
              Replace this block with your real contact flow from Info.txt, then connect your form or calendar link.
            </p>
            <a className="btn btn-solid" href="mailto:hello@example.com">
              Start the Conversation
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="footer container">
        <p>{content.companyName}</p>
        <p>Built with React + Vite for a production-ready launch.</p>
      </footer>
    </div>
  );
}
